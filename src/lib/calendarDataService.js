// src/lib/calendarDataService.js
'use client';

import {
    getDatabase, ref, onValue, set, update, push, child, off, serverTimestamp, get
} from "firebase/database";
import { db } from './firebaseConfig';

const getCopy = (data) => JSON.parse(JSON.stringify(data));

export const seedInitialDataToFirebase = async () => {
    if (!db) {
        console.error("SERVICE ERROR: Firebase DB instance is not available. Cannot seed data.");
        alert("Firebase DB not initialized. Check console and firebaseConfig.js.");
        return;
    }
    console.log("SERVICE: Attempting to seed initial data to Firebase...");
    const targetYear = 2025;
    const monthsToSeed = [
        { monthIndex: 4, name: "May" }, { monthIndex: 5, name: "June" }, { monthIndex: 6, name: "July" }
    ];
    const allDataToWrite = {};

    for (const monthInfo of monthsToSeed) {
        const { monthIndex } = monthInfo;
        const yearString = String(targetYear);
        const monthString = String(monthIndex + 1).padStart(2, '0');
        const daysInMonth = new Date(targetYear, monthIndex + 1, 0).getDate();
        let tuesdayCount = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const dayString = String(day).padStart(2, '0');
            const currentDate = new Date(targetYear, monthIndex, day);
            const dayOfWeek = currentDate.getDay();
            let dayStatus = 'available';
            let dayReason = '';

            if (dayOfWeek === 0) { dayStatus = 'unavailable'; dayReason = 'Weekend'; }
            if (day % 10 === 8) { dayStatus = 'unavailable'; dayReason = dayReason ? `${dayReason}, Special Block` : 'Special Block'; }
            if (dayOfWeek === 2) {
                tuesdayCount++;
                if (tuesdayCount % 2 === 0) { dayStatus = 'unavailable'; dayReason = dayReason ? `${dayReason}, Mid-week Break` : 'Mid-week Break'; }
            }

            const dayPath = `calendarByDate/${yearString}/${monthString}/${dayString}`;
            allDataToWrite[`${dayPath}/status`] = dayStatus;
            // Initialize activities as null. If we add activities later for this day,
            // we will write to specific child paths under activities, not this parent path.
            allDataToWrite[`${dayPath}/activities`] = null;
            allDataToWrite[`${dayPath}/reason`] = (dayStatus === 'unavailable' && dayReason) ? (dayReason.startsWith(',') ? dayReason.substring(2) : dayReason) : null;
        }
    }

    // --- Add Sample Activities ---
    // For days where we add activities, we ensure the specific activity paths are set.
    // The general loop above set `${dayPath}/activities` to null.
    // For Firebase `update`, setting a child path (e.g., /activities/act1) while the parent (/activities)
    // is also being set (e.g., to null or an empty object) in the SAME update batch can be problematic.
    // It's better to define the full structure for days with activities.

    const defineDayWithActivities = (year, monthStr, dayStr, desiredStatus, activitiesArray) => {
        const dayPath = `calendarByDate/${year}/${monthStr}/${dayStr}`;
        allDataToWrite[`${dayPath}/status`] = desiredStatus;
        // Explicitly set the activities node for days that will have activities.
        // If activitiesArray is empty but status is scheduled/pending, set to an empty object.
        allDataToWrite[`${dayPath}/activities`] = {};
        activitiesArray.forEach(act => {
            // Use push().key locally to get a unique key for the structure,
            // though Firebase will generate its own if just `push()` is used on the ref.
            // For a single update operation, we need to define the keys.
            const activityId = act.id || push(child(ref(db), `${dayPath}/activities`)).key; // Generate mock ID for structure
            allDataToWrite[`${dayPath}/activities/${activityId}`] = { ...act, id: activityId };
        });
        if (activitiesArray.length === 0 && (desiredStatus === 'scheduled' || desiredStatus === 'pending')) {
            // Ensure activities node is an empty object, not null, if day is scheduled/pending without initial activities
            allDataToWrite[`${dayPath}/activities`] = {};
        } else if (activitiesArray.length === 0 && desiredStatus === 'available') {
            allDataToWrite[`${dayPath}/activities`] = null; // No activities, day is available
        }

    };

    // May 15th, 2025 (Thursday) - Target initial status: available from loop
    let may15Status = allDataToWrite[`calendarByDate/2025/05/15/status`];
    if (may15Status === 'available') {
        defineDayWithActivities("2025", "05", "15", "pending", [
            { id: "seed_act_1", title: "Team Meeting", startTime: "10:00 AM", endTime: "11:00 AM", activityType: "Meeting", notes: "Project updates.", approved: true },
            { id: "seed_act_2", title: "User Yoga Request", startTime: "05:00 PM", endTime: "06:00 PM", activityType: "Yoga", notes: "Gentle Hatha.", bookedBy: { name: "Test User", email: "user@example.com" }, approved: false }
        ]);
    }

    // May 20th, 2025 (Tuesday, 3rd Tue - should be available from loop)
    let may20Status = allDataToWrite[`calendarByDate/2025/05/20/status`];
    if (may20Status === 'available') {
        defineDayWithActivities("2025", "05", "20", "scheduled", [
            { id: "seed_act_3", title: "Admin Confirmed Workshop", startTime: "01:00 PM", endTime: "03:00 PM", activityType: "Workshop", notes: "Internal only.", approved: true }
        ]);
    }

    // June 5th, 2025 (Thursday)
    let june5Status = allDataToWrite[`calendarByDate/2025/06/05/status`];
    if (june5Status === 'available') {
        defineDayWithActivities("2025", "06", "05", "scheduled", [
            { id: "seed_act_4", title: "Workshop Day 1", startTime: "09:00 AM", endTime: "05:00 PM", activityType: "Full Day Workshop", approved: true }
        ]);
    }

    // July 4th, 2025 (Friday)
    let july4Status = allDataToWrite[`calendarByDate/2025/07/04/status`];
    if (july4Status === 'available') {
        defineDayWithActivities("2025", "07", "04", "scheduled", [
            { id: "seed_act_6", title: "Client Onboarding", startTime: "11:00 AM", endTime: "12:30 PM", activityType: "Meeting", approved: true }
        ]);
    }


    try {
        await update(ref(db), allDataToWrite);
        console.log("SERVICE: Successfully seeded initial data to Firebase.");
        alert("Initial dummy data (May-July 2025 with activities) has been seeded to Firebase. Refresh the calendar to see changes if not immediate.");
    } catch (error) {
        console.error("SERVICE: Error seeding initial data to Firebase:", error);
        alert(`Error seeding data: ${error.message}`);
        throw error; // Re-throw to be caught by UI if necessary
    }
};

// --- OTHER SERVICE FUNCTIONS (initializeMonthAsAdmin, subscribeToMonthData, addActivityToDate, etc.) ---
// These functions from the previous response should be mostly correct,
// but ensure they handle the `activities: null` case properly when reading/writing.
// For example, when adding the first activity to a day, the 'activities' node needs to be created.

export const initializeMonthAsAdmin = async (year, month) => {
    if (!db) return Promise.reject("Firebase DB not initialized.");
    console.log(`ADMIN: Initializing ${year}-${month + 1} with all days as 'available'`);
    const monthString = String(month + 1).padStart(2, '0');
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const path = `calendarByDate/${year}/${monthString}`;

    const monthDataForFirebase = {};
    for (let i = 1; i <= daysInMonth; i++) {
        const dayString = String(i).padStart(2, '0');
        monthDataForFirebase[dayString] = {
            status: 'available',
            activities: null, // Explicitly set activities to null
            reason: null      // Explicitly set reason to null
        };
    }

    const monthRefDb = ref(db, path);
    try {
        await set(monthRefDb, monthDataForFirebase); // 'set' will overwrite the entire month node
        console.log(`Firebase: Month ${path} initialized by admin.`);
    } catch (error) {
        console.error(`Firebase: Error initializing month ${path}`, error);
        throw error;
    }
};

export const subscribeToMonthData = (year, month, callback) => {
    if (!db) {
        console.error("SERVICE ERROR: Firebase DB instance is not available for subscription.");
        callback({});
        return () => { };
    }
    const monthString = String(month + 1).padStart(2, '0');
    const path = `calendarByDate/${year}/${monthString}`;
    const monthRefDb = ref(db, path);

    const listener = onValue(monthRefDb, (snapshot) => {
        const data = snapshot.val() || {};
        callback(data);
    }, (error) => {
        console.error(`SERVICE: Error subscribing to ${path}`, error);
        callback({});
    });
    return () => {
        off(monthRefDb, 'value', listener);
    };
};

export const addActivityToDate = async (year, month, day, activityDetails, isSubmittedByAdmin = false, adminWantsDayToRemainAvailable = false) => {
    if (!db) return Promise.reject("Firebase DB not initialized.");
    const monthString = String(month + 1).padStart(2, '0');
    const dayString = String(day).padStart(2, '0');
    const dayPath = `calendarByDate/${year}/${monthString}/${dayString}`;

    const dayRefDb = ref(db, dayPath);
    let currentDaySnapshot;
    try {
        currentDaySnapshot = await get(dayRefDb);
    } catch (error) {
        console.error("Error fetching current day data:", error);
        throw new Error("Could not retrieve current day information. Please try again.");
    }

    let currentDayData = currentDaySnapshot.val() || { status: 'available', activities: null };

    if (!isSubmittedByAdmin && currentDayData.status !== 'available') {
        throw new Error("Bookings can only be made on 'available' days.");
    }

    const activitiesPath = `${dayPath}/activities`;
    const activitiesRefDb = child(ref(db), activitiesPath);
    const newActivityRef = push(activitiesRefDb);
    const newActivityId = newActivityRef.key;

    if (!newActivityId) { // Should not happen with Firebase push
        throw new Error("Failed to generate a new activity ID.");
    }

    const newActivity = {
        ...activityDetails, id: newActivityId,
        approved: isSubmittedByAdmin, submittedAt: serverTimestamp(),
    };

    let newDayStatus = currentDayData.status;
    // Ensure activities is an object before adding to it or checking its values
    const existingActivities = currentDayData.activities || {};
    const tempActivities = { ...existingActivities, [newActivityId]: newActivity };

    if (isSubmittedByAdmin) {
        if (adminWantsDayToRemainAvailable) newDayStatus = 'available';
        else {
            const hasOtherPending = Object.values(tempActivities).some(act => act.id !== newActivityId && act.approved === false);
            newDayStatus = hasOtherPending ? 'pending' : 'scheduled';
        }
    } else {
        newDayStatus = 'pending';
    }

    const updates = {};
    updates[`${activitiesPath}/${newActivityId}`] = newActivity;
    updates[`${dayPath}/status`] = newDayStatus;
    // If currentDayData.activities was null, and we add the first activity,
    // the path `${activitiesPath}/${newActivityId}` will create the `activities` parent node.

    try {
        await update(ref(db), updates);
        return newActivityId;
    } catch (error) {
        console.error("SERVICE: Error adding activity:", error);
        throw error;
    }
};


export const updateDayStatusAsAdmin = async (year, month, day, newStatus, reason = '') => {
    if (!db) return Promise.reject("Firebase DB not initialized.");
    const monthString = String(month + 1).padStart(2, '0');
    const dayString = String(day).padStart(2, '0');
    const dayPath = `calendarByDate/${year}/${monthString}/${dayString}`;

    const dayUpdates = {};
    dayUpdates[`${dayPath}/status`] = newStatus;
    dayUpdates[`${dayPath}/reason`] = (newStatus === 'unavailable' && reason) ? reason : null;
    // If changing to 'available', and it had activities that made it 'pending' or 'scheduled',
    // admin might want to clear activities or handle them separately. This function just sets status.
    // Per rule 2a: admin can set to 'available' even if approved activities exist.

    try {
        await update(ref(db), dayUpdates); // Use root ref for multi-path update
    } catch (error) {
        console.error(`ADMIN SERVICE: Error updating status for ${dayPath}`, error);
        throw error;
    }
};

export const updateActivityApprovalAsAdmin = async (year, month, day, activityId, isApproved, adminWantsDayToRemainAvailableAfterApproval = false) => {
    if (!db) return Promise.reject("Firebase DB not initialized.");
    const monthString = String(month + 1).padStart(2, '0');
    const dayString = String(day).padStart(2, '0');
    const dayPath = `calendarByDate/${year}/${monthString}/${dayString}`;

    const dayRefDb = ref(db, dayPath);
    let currentDaySnapshot;
    try {
        currentDaySnapshot = await get(dayRefDb);
    } catch (error) { throw new Error("Could not retrieve day information."); }

    const currentDayData = currentDaySnapshot.val();
    if (!currentDayData?.activities?.[activityId]) throw new Error("Activity or day not found.");

    const tempActivities = { ...currentDayData.activities };
    tempActivities[activityId] = { ...tempActivities[activityId], approved: isApproved };
    const allActivities = Object.values(tempActivities);
    const hasAnyPending = allActivities.some(act => act.approved === false);
    const hasAnyApproved = allActivities.some(act => act.approved === true);
    let newDayStatus;

    if (hasAnyPending) newDayStatus = 'pending'; // Rule 2e: "status should stay as pending until all unapproved activities are either approved or denied"
    else if (hasAnyApproved) newDayStatus = adminWantsDayToRemainAvailableAfterApproval ? 'available' : 'scheduled'; // Rule 2d
    else newDayStatus = 'available'; // No pending, no approved -> available

    const updates = {};
    updates[`${dayPath}/activities/${activityId}/approved`] = isApproved;
    updates[`${dayPath}/status`] = newDayStatus;
    try {
        await update(ref(db), updates);
    } catch (error) {
        console.error(`ADMIN SERVICE: Error updating activity approval for ${activityId}`, error);
        throw error;
    }
};

export const deleteActivityAsAdmin = async (year, month, day, activityId) => {
    if (!db) return Promise.reject("Firebase DB not initialized.");
    const monthString = String(month + 1).padStart(2, '0');
    const dayString = String(day).padStart(2, '0');
    const dayPath = `calendarByDate/${year}/${monthString}/${dayString}`;
    const activityPath = `${dayPath}/activities/${activityId}`;

    const dayRefDb = ref(db, dayPath);
    let currentDaySnapshot;
    try {
        currentDaySnapshot = await get(dayRefDb);
    } catch (error) { throw new Error("Could not retrieve day information."); }
    const currentDayData = currentDaySnapshot.val();
    if (!currentDayData?.activities?.[activityId]) { console.warn("Activity not found for deletion."); return; }

    const tempActivities = { ...currentDayData.activities };
    delete tempActivities[activityId];
    const allActivities = Object.values(tempActivities);
    const hasAnyPending = allActivities.some(act => act.approved === false);
    const hasAnyApproved = allActivities.some(act => act.approved === true);
    let newDayStatus;
    if (hasAnyPending) newDayStatus = 'pending';
    else if (hasAnyApproved) newDayStatus = 'scheduled';
    else newDayStatus = 'available';

    const updates = {};
    updates[activityPath] = null; // Deletes the activity
    updates[`${dayPath}/status`] = newDayStatus;
    if (Object.keys(tempActivities).length === 0) updates[`${dayPath}/activities`] = null;

    try {
        await update(ref(db), updates);
    } catch (error) {
        console.error(`ADMIN SERVICE: Error deleting activity ${activityId}`, error);
        throw error;
    }
};