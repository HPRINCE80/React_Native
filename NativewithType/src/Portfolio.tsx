import { useEffect, useRef, useState,useMemo } from 'react';
import {
  Image,
  LayoutChangeEvent,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Project = {
  id: string;
  title: string;
  stack: string;
  desc: string;
  tags: string[];
  live?: string;
  github?: string;
};

type Cert = { year: string; title: string; sub: string; url?: string };

const open = (url: string) => Linking.openURL(url);

const navItems = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Contact'];

const skills = [
  { title: 'Languages', text: 'C, C++, Python, JavaScript' },
  { title: 'Frontend', text: 'HTML, CSS, React.js, Tailwind CSS, GSAP, Framer Motion' },
  { title: 'JavaScript', text: 'DOM manipulation, ES6+, async/await, event-driven patterns' },
  { title: 'React', text: 'Hooks, component architecture, state management, SPA design' },
  { title: 'Backend', text: 'Node.js, Express.js, REST APIs, JWT Authentication' },
  { title: 'Database', text: 'MongoDB, MySQL: data modelling and querying' },
  { title: 'Tools', text: 'Git, GitHub, Postman, VS Code, Docker basics' },
];

const aboutCards = [
  { title: 'Full Stack', text: 'End-to-end development with React on frontend and Node/Express on backend.' },
  { title: 'Automation', text: 'Python scripts and voice-controlled tools that cut manual work significantly.' },
  { title: 'Open Source', text: 'Active GitHub contributor with 10+ repositories of personal and academic work.' },
];

const education = [
  { year: '2024 – 2028', title: 'B.Tech: Computer Science', line1: 'Dr. A.P.J. Abdul Kalam Technical University', line2: 'Bareilly, UP' },
  { year: '2022 – 2024', title: 'Intermediate (PCM)', line1: 'Kituka Devi Inter College', line2: 'Bareilly, UP' },
];

const projects: Project[] = [
  {
    id: '1',
    title: 'AI Resume Interview App',
    stack: 'React 19 · Node.js · Express · MongoDB · Google Gemini API · Docker · JWT · Google OAuth',
    desc: 'Full-stack AI interview preparation platform. Users upload resume and job description to get AI-generated interview analysis using Gemini API. Secure auth with JWT, cookie sessions and Google OAuth, PDF parsing with Multer, and Docker Compose setup.',
    tags: ['PDF Parsing', 'Google OAuth', 'Clean Architecture'],
    live: 'https://resumechecker-1-vsad.onrender.com/',
    github: 'https://github.com/HPRINCE80/Resumechecker',
  },
  {
    id: '2',
    title: 'AI Code Reviewer',
    stack: 'React.js · Monaco Editor · Node.js · Express.js · Gemini 2.5 Flash · Docker',
    desc: 'Gemini 2.5 Flash with a custom system prompt that acts like a Senior Code Reviewer, giving feedback on quality, security and performance. Backend built with strict MVC pattern.',
    tags: ['AI Integration', 'Code Review', 'MVC Architecture'],
    live: 'https://code-review-1-9r2r.onrender.com/',
    github: 'https://github.com/HPRINCE80/Code-Review',
  },
  {
    id: '3',
    title: 'SmartClasses: Online Learning Platform',
    stack: 'React · Node.js · Express · MongoDB · JWT · YouTube API',
    desc: 'Online education platform where teachers create courses with video lessons and students enroll to access content. JWT authentication with role-based access (Teacher/Student).',
    tags: ['Course Management', 'Enrollment System', 'Video Access Control', 'Freelance - ₹5,000'],
    live: 'https://sbasmartclasses.in',
  },
  {
    id: '4',
    title: 'Real-time Collaborative Editor',
    stack: 'React.js · Node.js · Express.js · Socket.io · Docker',
    desc: 'Collaborative code editor where multiple users edit code at the same time, with changes reflected instantly. WebSocket-based sync using Socket.io for low-latency communication.',
    tags: ['WebSockets', 'Real-time Sync', 'Multi-user'],
    live: 'https://real-time-collaborative-nraj.onrender.com/',
    github: 'https://github.com/HPRINCE80/Real-time-Collaborative',
  },
  {
    id: '5',
    title: 'Job Portal Application',
    stack: 'React · Node.js · Express · MongoDB · JWT',
    desc: 'Job portal with multi-role access for recruiters and candidates. Voice-based search via Web Speech API, 15+ RESTful APIs and JWT auth with role-based access control.',
    tags: ['50+ Job Listings', 'Role-Based Auth', 'Voice Search'],
    github: 'https://github.com/HPRINCE80',
  },
  {
    id: '6',
    title: 'Personal Assistant',
    stack: 'Python · pyttsx3 · SpeechRecognition',
    desc: 'Voice-controlled desktop assistant automating 10+ daily tasks like app launching, web search and answering queries. Reduced manual task time by ~40%.',
    tags: ['Voice Control', '10+ Tasks', '~40% Faster'],
    github: 'https://github.com/HPRINCE80',
  },
  {
    id: '7',
    title: 'Portfolio Website',
    stack: 'HTML · CSS · JavaScript',
    desc: 'Fully responsive personal site with CSS animations, smooth scroll, typed text and mobile-first design. Built from scratch with zero frameworks.',
    tags: ['Responsive', 'CSS Animations', 'No Frameworks'],
    live: 'https://hprince80.github.io/Portfolio/#home',
    github: 'https://github.com/HPRINCE80',
  },
];

const achievements = [
  { num: '300+', text: 'Striver SDE DSA sheet problems solved: arrays, strings, DP, trees and graphs.' },
  { num: '10+', text: 'GitHub repositories with personal and academic projects.' },
  { num: '1 Course', text: 'Completed MERN Stack Development: full project lifecycle from design to deployment.' },
];

const certs: Cert[] = [
  {
    year: '08/2026',
    title: 'Tata: GenAI Powered Data Analytics',
    sub: 'Job Simulation, Forage',
    url: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_69ca8d24008a886661fe97b9_1785732220651_completion_certificate.pdf',
  },
  {
    year: '2026',
    title: 'LinkedIn Content and Creative Design',
    sub: 'Certification, LinkedIn',
    url: 'https://training.marketing.linkedin.com/verify/o96q7x6okizy',
  },
  {
    year: '09/2024',
    title: 'Mr. Fresher Award',
    sub: 'ANA College of Engineering and Management: recognized for outstanding personality and communication skills among all first-year students.',
  },
];

const interests = [
  'Hindi', 'English', 'Web Development', 'AI Integration',
  'Open Source', 'UI/UX Design', 'Automation Tools',
];

const phrases = ['Full Stack App', 'React Interfaces', 'Python Automations'];

function TypedText() {
  const styles = useStyles();
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    let delay = deleting ? 40 : 90;
    if (!deleting && charCount === current.length) delay = 1200;
    if (deleting && charCount === 0) delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && charCount === current.length) {
        setDeleting(true);
      } else if (deleting && charCount === 0) {
        setDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      } else {
        setCharCount(charCount + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charCount, deleting, phraseIndex]);

  return (
    <Text style={styles.role}>
      I build {phrases[phraseIndex].slice(0, charCount)}|
    </Text>
  );
}

function SectionTitle({ title, accent }: { title: string; accent: string }) {
    const styles = useStyles();
  return (
    <Text style={styles.sectionTitle}>
      {title} <Text style={styles.accent}>{accent}</Text>
    </Text>
  );
}

function Chip({ label, dark }: { label: string; dark?: boolean }) {
    const styles = useStyles();
  return (
    <View style={[styles.chip, dark && styles.chipDark]}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

export default function Portfolio() {
const styles = useStyles();
  const insets = useSafeAreaInsets();

  const scrollRef = useRef<ScrollView>(null);
  const positions = useRef<Record<string, number>>({});

  const section = (key: string) => ({
    onLayout: (e: LayoutChangeEvent) => {
      positions.current[key] = e.nativeEvent.layout.y;
    },
  });

  const goTo = (key: string) => {
    scrollRef.current?.scrollTo({ y: positions.current[key] ?? 0, animated: true });
  };

  return (
    <View style={styles.screen}>
      {/* NAVBAR */}
      <View style={[styles.nav, { paddingTop: insets.top + 8 }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navRow}>
          {navItems.map(item => (
            <Pressable key={item} onPress={() => goTo(item)}>
              <Text style={styles.navText}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.screen}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 20,
        }}>
        {/* HOME */}
        <View {...section('Home')}>
          <View style={styles.header}>
            <Image source={require('./assets/image.png')} style={styles.avatar} />
            <Text style={styles.greeting}>Radhe Radhe, I'm</Text>
            <Text style={styles.name}>Prince Yaduvanshi</Text>
            <TypedText />
            <Text style={styles.intro}>
              B.Tech CS student passionate about MERN stack development and Python
              automation. I build scalable web applications with clean UI/UX, secure
              APIs, and real-time features.
            </Text>
            <View style={styles.socialRow}>
              <Pressable style={styles.smallBtn} onPress={() => open('https://github.com/HPRINCE80')}>
                <Text style={styles.buttonText}>GitHub</Text>
              </Pressable>
              <Pressable
                style={styles.smallBtn}
                onPress={() => open('https://www.linkedin.com/in/prince-yaduvanshi-a99b71354')}>
                <Text style={styles.buttonText}>LinkedIn</Text>
              </Pressable>
              <Pressable style={styles.smallBtn} onPress={() => open('http://wa.me/918057160928')}>
                <Text style={styles.buttonText}>WhatsApp</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* ABOUT */}
        <View {...section('About')}>
          <SectionTitle title="About" accent="Me" />
          <Text style={styles.subHeading}>Turning ideas into full-stack reality.</Text>
          <Text style={styles.body}>
            I'm a Computer Science student at AKTU (2024–2028) focused on MERN stack
            development and Python automation. I love building complete web
            experiences, from pixel-perfect frontends to robust backend APIs.
          </Text>
          <View style={styles.statsRow}>
            {[
              ['4+', 'Projects'],
              ['300+', 'DSA Problems'],
              ['10+', 'GitHub Repos'],
            ].map(([n, l]) => (
              <View key={l} style={styles.stat}>
                <Text style={styles.statNum}>{n}</Text>
                <Text style={styles.statLabel}>{l}</Text>
              </View>
            ))}
          </View>
          {aboutCards.map(c => (
            <View key={c.title} style={styles.card}>
              <Text style={styles.cardTitle}>{c.title}</Text>
              <Text style={styles.cardDesc}>{c.text}</Text>
            </View>
          ))}
        </View>

        {/* EDUCATION */}
        <View {...section('Education')}>
          <SectionTitle title="Education" accent="Timeline" />
          {education.map(e => (
            <View key={e.title} style={styles.card}>
              <Text style={styles.year}>{e.year}</Text>
              <Text style={styles.cardTitle}>{e.title}</Text>
              <Text style={styles.cardDesc}>{e.line1}</Text>
              <Text style={styles.cardDesc}>{e.line2}</Text>
            </View>
          ))}
        </View>

        {/* SKILLS */}
        <View {...section('Skills')}>
          <SectionTitle title="My" accent="Skills" />
          {skills.map(s => (
            <View key={s.title} style={styles.card}>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <Text style={styles.cardDesc}>{s.text}</Text>
            </View>
          ))}
        </View>

        {/* PROJECTS */}
        <View {...section('Projects')}>
          <SectionTitle title="My" accent="Projects" />
          {projects.map(p => (
            <View key={p.id} style={styles.card}>
              <Text style={styles.cardTitle}>{p.title}</Text>
              <Text style={styles.stack}>{p.stack}</Text>
              <Text style={styles.cardDesc}>{p.desc}</Text>
              <View style={styles.chipRow}>
                {p.tags.map(t => (
                  <Chip key={t} label={t} />
                ))}
              </View>
              <View style={styles.linkRow}>
                {p.live && (
                  <Pressable
                    style={({ pressed }) => [styles.smallBtn, pressed && styles.pressed]}
                    onPress={() => open(p.live!)}>
                    <Text style={styles.buttonText}>Live Demo</Text>
                  </Pressable>
                )}
                {p.github && (
                  <Pressable
                    style={({ pressed }) => [styles.smallBtn, styles.darkBtn, pressed && styles.pressed]}
                    onPress={() => open(p.github!)}>
                    <Text style={[styles.buttonText, styles.darkBtnText]}>GitHub</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* ACHIEVEMENTS (navbar me button nahi hai) */}
        <SectionTitle title="Achievements" accent="& Activities" />
        {achievements.map(a => (
          <View key={a.num} style={styles.card}>
            <Text style={styles.achNum}>{a.num}</Text>
            <Text style={styles.cardDesc}>{a.text}</Text>
          </View>
        ))}

        <SectionTitle title="Certifications" accent="& Awards" />
        {certs.map(c => (
          <Pressable
            key={c.title}
            disabled={!c.url}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => c.url && open(c.url)}>
            <Text style={styles.year}>{c.year}</Text>
            <Text style={styles.cardTitle}>{c.title}</Text>
            <Text style={styles.cardDesc}>{c.sub}</Text>
          </Pressable>
        ))}

        <SectionTitle title="Languages" accent="& Interests" />
        <View style={styles.chipRow}>
          {interests.map(i => (
            <Chip key={i} label={i} />
          ))}
        </View>

        {/* CONTACT */}
        <View {...section('Contact')}>
          <SectionTitle title="Contact" accent="Me" />
          <Text style={styles.body}>
            Open to internships, freelance projects, and collaborations.
          </Text>
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => open('mailto:princeyaduvanshi226@gmail.com')}>
            <Text style={styles.cardTitle}>Email</Text>
            <Text style={styles.cardDesc}>princeyaduvanshi226@gmail.com</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => open('tel:+919410836558')}>
            <Text style={styles.cardTitle}>Phone</Text>
            <Text style={styles.cardDesc}>+91 9410836558</Text>
          </Pressable>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Location</Text>
            <Text style={styles.cardDesc}>Noida, Uttar Pradesh, India</Text>
          </View>
        </View>

        <Text style={styles.footer}>© 2026 Prince Yaduvanshi</Text>
      </ScrollView>
    </View>
  );
}

const colors = {
  bg: '#111318',
  surface: '#1a1f28',
  card: '#1e242e',
  nav: 'rgba(17, 19, 24, 0.95)',
  text: '#e2e8f0',
  muted: '#8892a4',
  primary: '#7cf03d',
  primaryDim: 'rgba(124, 240, 61, 0.12)',
  primaryBorder: 'rgba(124, 240, 61, 0.22)',
  onPrimary: '#0a0c0f',
  navBorder: 'rgba(255, 255, 255, 0.06)',
};

type Colors = typeof colors;

function useStyles() {
  return useMemo(() => makeStyles(colors), []);
}

const makeStyles = (c: Colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.bg },
    nav: {
      backgroundColor: c.nav,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: c.navBorder,
    },
    navRow: { paddingHorizontal: 20, gap: 22 },
    navText: { fontSize: 15, fontWeight: '600', color: c.muted },
    header: { alignItems: 'center', marginBottom: 8 },
    avatar: { width: 140, height: 140, borderRadius: 70, borderWidth: 4, borderColor: c.primary },
    greeting: { fontSize: 16, color: c.primary, marginTop: 16, fontWeight: '500' },
    name: { fontSize: 30, fontWeight: 'bold', marginTop: 4, textAlign: 'center', color: c.text },
    role: { fontSize: 14, color: c.primary, marginTop: 6, textAlign: 'center', fontWeight: '600' },
    intro: { fontSize: 15, color: c.muted, textAlign: 'center', marginTop: 12, lineHeight: 22 },
    socialRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
    sectionTitle: { fontSize: 24, fontWeight: '700', marginTop: 32, marginBottom: 12, color: c.text },
    accent: { color: c.primary },
    subHeading: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: c.text },
    body: { fontSize: 15, color: c.muted, lineHeight: 22, marginBottom: 12 },
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
    stat: {
      flex: 1,
      backgroundColor: c.primaryDim,
      borderWidth: 1,
      borderColor: c.primaryBorder,
      borderRadius: 14,
      padding: 12,
      alignItems: 'center',
    },
    statNum: { fontSize: 22, fontWeight: 'bold', color: c.primary },
    statLabel: { fontSize: 12, color: c.muted, textAlign: 'center' },
    card: {
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.primaryBorder,
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
    },
    cardTitle: { fontSize: 18, fontWeight: '700', color: '#ffffff' },
    cardDesc: { fontSize: 14, color: c.muted, marginTop: 4, lineHeight: 20 },
    stack: { fontSize: 12, color: c.primary, marginTop: 4, fontWeight: '600' },
    year: { fontSize: 13, color: c.primary, fontWeight: '700', marginBottom: 4 },
    achNum: { fontSize: 28, fontWeight: 'bold', color: c.primary },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
    chip: {
      backgroundColor: c.primaryDim,
      borderWidth: 1,
      borderColor: c.primaryBorder,
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 20,
    },
    chipDark: { backgroundColor: c.surface },
    chipText: { color: c.primary, fontWeight: '600', fontSize: 12 },
    linkRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
    smallBtn: { backgroundColor: c.primary, paddingVertical: 10, paddingHorizontal: 18, borderRadius: 50 },
    darkBtn: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: c.primary,
    },
    buttonText: { color: c.onPrimary, fontSize: 14, fontWeight: '700' },
    darkBtnText: { color: c.primary },
    pressed: { opacity: 0.7 },
    footer: { textAlign: 'center', color: c.muted, marginTop: 24 },
  });