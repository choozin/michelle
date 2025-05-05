// File: src/app/page.jsx
'use client';

import { useState } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Anchor,
  Box,
  Container,
  Group,
  Burger,
  Title,
  Text,
  Button,
  Blockquote,
  Grid,
  Center,
  Divider,
  TextInput,
  Radio,
  RadioGroup,
  Modal,
  Space,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Calendar } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  FaBars,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaArrowRight,
  FaComment,
  FaIdCard,
  FaBriefcase,
  FaCheckSquare,
  FaArrowUp,
  FaChevronDown,
} from 'react-icons/fa';

import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

export default function HomePage() {
  // determine current path slug for underline logic
  const pathname = usePathname();
  const currentSlug = pathname === '/' ? 'home' : pathname.slice(1);

  const [navOpened, setNavOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState('08:00');

  const isMobile = useMediaQuery('(max-width: 768px)');
  const quoteForm = useForm({ initialValues: { email: '' } });
  const subscribeForm = useForm({ initialValues: { name: '', email: '' } });

  // define your navigation items with slugs matching paths
  const navLinks = [
    { label: 'Home', href: '/', slug: 'home' },
    { label: 'About Me', href: '/about', slug: 'about' },
    { label: 'Change Your Life', href: '/change-your-life', slug: 'change-your-life' },
    { label: 'Workshops', href: '/workshops', slug: 'workshops' },
    { label: 'Blog', href: '/blog', slug: 'blog' },
    { label: 'Meet Me', href: '/meet-me', slug: 'meet-me' },
  ];

  return (
    <>
      <div className="overlay" />
      <div className="outer-wrapper">
        <div className="page-wrapper">
          {/* Header */}
          <header className="navigation" id="top">
            {/* Secondary Nav */}
            <Container size="lg">
              <Group
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                  gap: '16px',
                  fontSize: '10px',
                  color: '#646464',
                  fontFamily: '"Lato", sans-serif',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  paddingRight: '16px',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <FaEnvelope /> michelle@outlook.com
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <FaPhone /> 519‑222‑7995
                </span>
              </Group>
            </Container>

            {/* Main Nav */}
            <Container size="lg">
              <Group
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0 1rem',
                  boxSizing: 'border-box',
                }}
              >
                {/* Brand */}
                <Link href="/" passHref>
                  <Anchor>
                    <Image
                      src="/assets/img/logo.png"
                      alt="Logo"
                      width={150}
                      height={50}
                    />
                  </Anchor>
                </Link>

                {/* Desktop Links */}
                <Group
                  style={{
                    display: isMobile ? 'none' : 'flex',
                    justifyContent: 'end',
                    gap: '20px',
                    width: '100%',
                  }}
                >
                  {navLinks.map((link) => (
                    <Anchor key={link.slug} href={link.href}
                      style={{
                        color: '#444',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        fontFamily: '"Lato", sans-serif',
                        fontWeight: '700',
                        fontSize: '12px',
                        paddingBottom: currentSlug === link.slug ? '4px' : '0',
                        borderBottom:
                          currentSlug === link.slug
                            ? '3px solid #37b048'
                            : 'none',
                      }}
                      underline={false}
                    >
                      {link.label}
                    </Anchor>
                  ))}
                </Group>

                {/* Mobile Burger */}
                <div style={{
                  display: isMobile ? 'flex' : 'none',
                  justifyContent: 'end',
                  width: '100%',
                }}>
                  <div
                    onClick={() => alert('menu')}
                  />
                  <FaBars style={{
                    display: isMobile ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#444',
                    fontSize: '30px',
                    marginRight: '16px',
                  }}
                    onClick={() => setNavOpened(true)}
                  />
                  {/* Mobile Links */}
                  {navOpened && (
                    <div style={{
                      position: 'fixed',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#fff',
                      zIndex: 999,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'start',
                      gap: '24px',
                      overflowY: 'auto',
                    }}>
                      <div style={{
                        color: '#222',
                        textTransform: 'uppercase',
                        fontFamily: '"Lato", sans-serif',
                        fontWeight: '700',
                        fontSize: '32px',
                        marginTop: '128px',
                        marginBottom: '24px',
                        paddingBottom: '8px',
                      }}>
                        Menu
                      </div>
                      {navLinks.map((link) => (
                        <div
                          style={{
                            color: '#444',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            fontFamily: '"Lato", sans-serif',
                            fontWeight: '500',
                            fontSize: '16px',
                            borderBottom:
                              currentSlug === link.slug
                                ? '3px solid #37b048'
                                : 'none',
                          }}
                          key={link.slug}
                          href={link.href}
                          passHref
                          onClick={() => setNavOpened(false)}
                        >
                          {link.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </Group>
            </Container>
          </header>

          {/* Hero Slider }
          <Box className="hero-slider" sx={{ minHeight: 100 }}>
            <Carousel
              autoplay={10000}
              loop
              withIndicators
              height={500}
              slideSize="100%"
            >
              <Carousel.Slide>
                <Box sx={{ position: 'relative', width: '100%', height: 500 }}>
                  <Image
                    src="/assets/img/slide.jpg"
                    alt="Slide 1"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Box className="tp-caption" sx={{ position: 'absolute', left: 0, top: 150 }}>
                  <Text className="opacity-40">
                    Hi, I’m Jane Doe. A Personal Mentor
                  </Text>
                </Box>
                <Box className="tp-caption" sx={{ position: 'absolute', left: 0, top: 210 }}>
                  <Title order={1}>Uncover the Secret<br />of Successful Life!</Title>
                </Box>
                <Box className="tp-caption" sx={{ position: 'absolute', left: 0, top: 410 }}>
                  <Button
                    component={Link}
                    href="#five-steps-to-success"
                    variant="subtle"
                    className="link underline scroll"
                    leftIcon={<FaArrowRight />}
                  >
                    Tell Me How
                  </Button>
                </Box>
              </Carousel.Slide>

              <Carousel.Slide>
                <Box sx={{ position: 'relative', width: '100%', height: 500 }}>
                  <Image
                    src="/assets/img/slide-02.jpg"
                    alt="Slide 2"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Box className="tp-caption" sx={{ position: 'absolute', left: 0, top: 150 }}>
                  <Text className="opacity-40 text-color-white">
                    I will tell you how to
                  </Text>
                </Box>
                <Box className="tp-caption" sx={{ position: 'absolute', left: 0, top: 210 }}>
                  <Title order={1} className="text-color-white">
                    Restart Your Career<br />To Be more Successful
                  </Title>
                </Box>
                <Box className="tp-caption" sx={{ position: 'absolute', left: 0, top: 410 }}>
                  <Button
                    component={Link}
                    href="#five-steps-to-success"
                    className="link underline scroll text-color-white"
                    leftIcon={<FaArrowRight />}
                  >
                    Tell Me How
                  </Button>
                </Box>
              </Carousel.Slide>
            </Carousel>
          </Box>
          */}

          {/* Another Carousel */}
          <Carousel
            withIndicators
            height={500}
            slideSize="100%"
            loop
            autoplay={10000}
          >
            <Carousel.Slide>
              <Box sx={{ position: 'relative', width: '100%', height: 500 }}>
                <Image
                  src="/assets/img/slide.jpg"
                  alt="Slide 1"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Carousel.Slide>

            <Carousel.Slide>
              <Box sx={{ position: 'relative', width: '100%', height: 500 }}>
                <Image
                  src="/assets/img/slide-02.jpg"
                  alt="Slide 2"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Carousel.Slide>
          </Carousel>
          <div style={{
            position: 'relative',
            width: '100%',
            height: 500
          }}>
          <Image
            src="./img/forest.jpg"
            alt="Slide 12"
            width={20} 
            height={20}
          />
          </div>

          {/* Divider }
          <Center>
            <Divider my="lg" label={<FaChevronDown />} labelPosition="center" />
          </Center>
          */}

          {/*<div className="page-content">*/}
          {/* Features }
            <Box component="section" className="block" id="features">
              <Container size="lg">
                <Grid>
                  <Grid.Col sm={6} md={3}>
                    <Box className="feature-box">
                      <FaComment />
                      <Text component="a" href="">
                        <h3>My Mentoring</h3>
                      </Text>
                      <Text>
                        Fusce facilisis nec ante et accumsan. Ut malesuada tristique sagittis
                      </Text>
                      <Button compact leftIcon={<FaArrowRight />} />
                    </Box>
                  </Grid.Col>
                  <Grid.Col sm={6} md={3}>
                    <Box className="feature-box">
                      <FaIdCard />
                      <Text component="a" href="">
                        <h3>Successful Stories</h3>
                      </Text>
                      <Text>
                        Fusce facilisis nec ante et accumsan. Ut malesuada tristique sagittis
                      </Text>
                      <Button compact leftIcon={<FaArrowRight />} />
                    </Box>
                  </Grid.Col>
                  <Grid.Col sm={6} md={3}>
                    <Box className="feature-box">
                      <FaBriefcase />
                      <Text component="a" href="">
                        <h3>For Companies</h3>
                      </Text>
                      <Text>
                        Fusce facilisis nec ante et accumsan. Ut malesuada tristique sagittis
                      </Text>
                      <Button compact leftIcon={<FaArrowRight />} />
                    </Box>
                  </Grid.Col>
                  <Grid.Col sm={6} md={3}>
                    <Box className="feature-box">
                      <FaCheckSquare />
                      <Text component="a" href="">
                        <h3>Kick Up Your Career</h3>
                      </Text>
                      <Text>
                        Fusce facilisis nec ante et accumsan. Ut malesuada tristique sagittis
                      </Text>
                      <Button compact leftIcon={<FaArrowRight />} />
                    </Box>
                  </Grid.Col>
                </Grid>
              </Container>
              <Box className="bg bg-color-neutral opacity-50" />
            </Box>
            */}

          {/* Quote }
            <Box className="block">
              <Container size="lg">
                <Blockquote className="center">
                  <Text>
                    Maecenas pharetra imperdiet finibus. Aenean tortor lectus, facilisis non pellentesque non
                  </Text>
                  <Text size="sm">Jane Doe</Text>
                </Blockquote>
              </Container>
              <Box className="bg bg-color-neutral opacity-20" />
            </Box>
            */}

          {/* About Me }
            <Box className="block" id="about-me">
              <Container size="lg">
                <Title order={2}>About Me</Title>
                <Grid>
                  <Grid.Col sm={6} md={6}>
                    <Center>
                      <Image
                        src="/assets/img/author.jpg"
                        alt="Author"
                        width={200}
                        height={200}
                        className="circle"
                      />
                    </Center>
                  </Grid.Col>
                  <Grid.Col sm={6} md={6}>
                    <Title order={3} className="no-bottom-margin">
                      <strong>Jane Doe</strong>
                    </Title>
                    <Text><h5>A personal mentor</h5></Text>
                    <Text mt="sm">
                      Sed iaculis dapibus tellus eget condimentum. Curabitur ut tellus congue, convallis tortor et, pellentesque diam. Nullam non dolor eu ligula ultrices pellentesque placerat imperdiet metus.
                    </Text>
                    <Space h="md" />
                    <Grid columns={3} gutter="md">
                      {[
                        { n: 68, label: 'Persons Mentored' },
                        { n: 45, label: 'Workshops Attended' },
                        { n: 12, label: 'Coaching Certificates' },
                      ].map((x) => (
                        <Grid.Col span={1} key={x.label}>
                          <Box className="number">
                            <Text size="xl">{x.n}</Text>
                            <Text size="sm">{x.label}</Text>
                          </Box>
                        </Grid.Col>
                      ))}
                    </Grid>
                    <Divider my="md" />
                    <Button component="a" href="">
                      More about me
                    </Button>
                  </Grid.Col>
                </Grid>
              </Container>
            </Box>
            */}

          {/* Daily Motivation }
            <Container size="lg">
              <Box className="block center">
                <Title order={2} className="text-color-white half-bottom-margin">
                  <strong>Your Daily Motivation Quote</strong>
                </Title>
                <Grid justify="center">
                  <Grid.Col sm={6} md={6}>
                    <form
                      id="form-daily-motivation"
                      onSubmit={quoteForm.onSubmit((values) => console.log(values))}
                    >
                      <Group noWrap>
                        <div className="form-status text-color-white" />
                        <TextInput
                          placeholder="Enter your e-mail"
                          {...quoteForm.getInputProps('email')}
                          required
                        />
                        <Button type="submit" variant="white" leftIcon={<FaArrowRight />}>
                        </Button>
                      </Group>
                    </form>
                  </Grid.Col>
                </Grid>
                <Box className="bg">
                  <Image
                    src="/assets/img/bg.jpg"
                    alt="Background"
                    width={800}
                    height={400}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Box>
              </Box>
            </Container>
            */}

          {/* Five Steps }
            <Box className="block" id="five-steps-to-success">
              <Container size="lg">
                <Title order={2} align="center">
                  Five Steps to Your Success
                </Title>
                <Grid>
                  {[
                    { step: 1, title: 'Contact Me' },
                    { step: 2, title: 'Make an Appointment' },
                    { step: 3, title: 'I will Analyze Your Profile' },
                    { step: 4, title: 'Apply Changes' },
                    { step: 5, title: 'Apply Changes' },
                  ].map((item) => (
                    <Grid.Col sm={6} md={2} key={item.step}>
                      <Box className="step width-20">
                        <figure>
                          <aside>{item.step}.</aside>
                        </figure>
                        <Title order={3}>{item.title}</Title>
                        <Divider />
                        <Text size="sm">
                          Sed iaculis dapibus tellus eget condimentum.
                        </Text>
                      </Box>
                    </Grid.Col>
                  ))}
                </Grid>
                <Center mt="md">
                  <Button component="a" href="#make-an-appointment" className="btn btn-default btn-big">
                    Contact Me!
                  </Button>
                </Center>
                <Box className="bg bg-color-neutral opacity-50" />
              </Container>
            </Box>
            */}

          {/* Subscribe }
            <Box className="block">
              <Container size="lg">
                <Title order={2} align="center">
                  Do You Want a Successful Life?
                </Title>
                <Divider my="sm" />
                <Title order={3} align="center">
                  Enter your name and e-mail and I will tell you for free!
                </Title>
                <form
                  id="form-subscribe"
                  onSubmit={subscribeForm.onSubmit((v) => console.log(v))}
                >
                  <Grid>
                    <Grid.Col md={5}>
                      <TextInput
                        placeholder="Your Name"
                        {...subscribeForm.getInputProps('name')}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col md={5}>
                      <TextInput
                        placeholder="Your E-mail"
                        {...subscribeForm.getInputProps('email')}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col md={2}>
                      <Button fullWidth type="submit">
                        Send Me
                      </Button>
                    </Grid.Col>
                  </Grid>
                  <div className="form-status" />
                </form>
                <Box className="bg bg-color-neutral opacity-20" />
              </Container>
            </Box>
            */}

          {/* Appointment & Calendar }
            <Box className="block" id="make-an-appointment">
              <Container size="lg">
                <Title order={2} align="center">
                  Make an Appointment With Me
                </Title>
                <Center>
                  <Calendar value={date} onChange={setDate} className="calendar big" />
                </Center>
                <Center mt="md">
                  <Button onClick={() => setModalOpened(true)}>
                    Book Time Slot
                  </Button>
                </Center>
                <Box className="bg" />
              </Container>
            </Box>

          </div>
        
        */}

          {/* Footer }
          <Box component="footer" id="footer">
            <Container size="lg">
              <Grid align="center">
                <Grid.Col md={8}>
                  <Text>(C) 2015 Jane Doe. All Right Reserved</Text>
                </Grid.Col>
                <Grid.Col md={4}>
                  <Group position="right">
                    <Link href="#top" className="scroll">
                      To Top <FaArrowUp />
                    </Link>
                  </Group>
                </Grid.Col>
              </Grid>
            </Container>
          </Box>
          </div>
        */}
        </div>

        {/* Modal }
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Make an Appointment"
          size="lg"
          centered
        >
          <Title order={4}>Select the Time</Title>
          <RadioGroup
            name="slots"
            value={slot}
            onChange={setSlot}
            orientation="vertical"
          >
            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'].map((t) => (
              <Radio
                key={t}
                value={t}
                label={
                  <>
                    {t}{' '}
                    <Text component="span" size="xs">
                      {t === '12:00' ? 'Not available' : 'Available'}
                    </Text>
                  </>
                }
                disabled={t === '12:00'}
              />
            ))}
          </RadioGroup>
          <form>
            <Grid mt="md">
              <Grid.Col sm={6}>
                <TextInput placeholder="First Name" required />
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput placeholder="Last Name" required />
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput placeholder="E-mail" type="email" required />
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput placeholder="Number" pattern="\d*" required />
              </Grid.Col>
            </Grid>
            <Button mt="md" fullWidth>
              Contact Me
            </Button>
          </form>
        </Modal>
        */}
      </div>
    </>
  );
}