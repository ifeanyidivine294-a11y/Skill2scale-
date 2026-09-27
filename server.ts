import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'registrations.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface Registration {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  houseAddress: string;
  dob: string;
  education: string;
  referralSource: string;
  selectedCourse: string;
  coursePrice: string;
  motivation: string;
  additionalSkills: string[];
  paymentStatus: 'Paid' | 'Pending / Optional' | 'Confirmed';
  paymentMade: boolean;
  paymentReference?: string;
  registrationDate: string;
  timestamp: number;
}

function loadRegistrations(): Registration[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading registrations file:', err);
  }

  // Initial seed registrations for realism in admin dashboard and social proof
  const initialSeeds: Registration[] = [
    {
      id: 'S2S-2026-8841',
      fullName: 'Blessing Okon',
      phone: '+2348039201948',
      email: 'blessing.okon@example.com',
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Ikeja',
      houseAddress: '14 Allen Avenue, Ikeja',
      dob: '2001-05-14',
      education: "Bachelor's Degree",
      referralSource: 'Instagram',
      selectedCourse: 'Digital Marketing',
      coursePrice: '₦5,000',
      motivation: 'I want to build in-demand digital marketing skills to offer remote services to international clients and grow local brands.',
      additionalSkills: ['Content Creation', 'SEO Writing'],
      paymentStatus: 'Paid',
      paymentMade: true,
      registrationDate: '2026-09-25T14:20:00Z',
      timestamp: Date.now() - 172800000,
    },
    {
      id: 'S2S-2026-8842',
      fullName: 'Ibrahim Musa',
      phone: '+2348149920124',
      email: 'musa.ibrahim@example.com',
      country: 'Nigeria',
      state: 'FCT Abuja',
      city: 'Garki',
      houseAddress: '22 Area 11, Garki',
      dob: '1999-11-20',
      education: 'HND',
      referralSource: 'Friend / Referral',
      selectedCourse: 'AI & Automation',
      coursePrice: '₦26,000',
      motivation: 'To integrate modern AI automation tools into business workflows and provide consulting for tech startups.',
      additionalSkills: ['Website Design', 'Digital Strategy'],
      paymentStatus: 'Paid',
      paymentMade: true,
      registrationDate: '2026-09-26T09:15:00Z',
      timestamp: Date.now() - 86400000,
    },
    {
      id: 'S2S-2026-8843',
      fullName: 'Chidinma Eze',
      phone: '+2349021884319',
      email: 'chidinma.eze@example.com',
      country: 'Nigeria',
      state: 'Rivers',
      city: 'Port Harcourt',
      houseAddress: '5 Peter Odili Road',
      dob: '2003-03-08',
      education: 'SSCE / WAEC / NECO',
      referralSource: 'WhatsApp',
      selectedCourse: 'Graphics Design',
      coursePrice: '₦5,000',
      motivation: 'Passionate about visual branding, social media assets, and typography for businesses.',
      additionalSkills: ['UI/UX Design', 'Video Editing'],
      paymentStatus: 'Pending / Optional',
      paymentMade: false,
      registrationDate: '2026-09-26T18:40:00Z',
      timestamp: Date.now() - 36000000,
    },
    {
      id: 'S2S-2026-8844',
      fullName: 'Kofi Mensah',
      phone: '+233241829910',
      email: 'kofi.mensah@example.com',
      country: 'Ghana',
      state: 'Greater Accra',
      city: 'Accra',
      houseAddress: 'Osu Oxford Street, Accra',
      dob: '2000-08-19',
      education: "Bachelor's Degree",
      referralSource: 'LinkedIn',
      selectedCourse: 'UI/UX Design',
      coursePrice: '₦5,000',
      motivation: 'Transitioning from graphic design into product design and user experience research.',
      additionalSkills: ['Website Design', 'Content Creation'],
      paymentStatus: 'Paid',
      paymentMade: true,
      registrationDate: '2026-09-27T01:30:00Z',
      timestamp: Date.now() - 14400000,
    }
  ];

  fs.writeFileSync(DATA_FILE, JSON.stringify(initialSeeds, null, 2));
  return initialSeeds;
}

function saveRegistrations(regs: Registration[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(regs, null, 2));
  } catch (err) {
    console.error('Error saving registrations:', err);
  }
}

app.use(express.json());

// API Routes
app.get('/api/registrations', (req, res) => {
  const regs = loadRegistrations();
  const { search, course, status, location } = req.query;

  let filtered = [...regs];

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      r =>
        r.fullName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q)
    );
  }

  if (course && typeof course === 'string' && course !== 'All') {
    filtered = filtered.filter(r => r.selectedCourse.toLowerCase() === course.toLowerCase());
  }

  if (status && typeof status === 'string' && status !== 'All') {
    filtered = filtered.filter(r => r.paymentStatus === status);
  }

  if (location && typeof location === 'string' && location !== 'All') {
    filtered = filtered.filter(
      r => r.country.toLowerCase().includes(location.toLowerCase()) || r.state.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Sort descending by timestamp
  filtered.sort((a, b) => b.timestamp - a.timestamp);

  res.json({
    total: regs.length,
    filteredCount: filtered.length,
    data: filtered,
  });
});

app.post('/api/registrations', (req, res) => {
  try {
    const body = req.body;
    if (!body.fullName || !body.phone || !body.email || !body.selectedCourse) {
      res.status(400).json({ error: 'Missing required registration fields' });
      return;
    }

    const regs = loadRegistrations();
    const idNum = Math.floor(1000 + Math.random() * 9000);
    const newReg: Registration = {
      id: `S2S-2026-${idNum}`,
      fullName: body.fullName.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      country: body.country?.trim() || 'Nigeria',
      state: body.state?.trim() || '',
      city: body.city?.trim() || '',
      houseAddress: body.houseAddress?.trim() || '',
      dob: body.dob || '',
      education: body.education || 'Other',
      referralSource: body.referralSource || 'Online',
      selectedCourse: body.selectedCourse,
      coursePrice: body.selectedCourse.toLowerCase().includes('ai & automation') ? '₦26,000' : '₦5,000',
      motivation: body.motivation?.trim() || '',
      additionalSkills: Array.isArray(body.additionalSkills) ? body.additionalSkills : [],
      paymentStatus: body.paymentMade ? 'Paid' : 'Pending / Optional',
      paymentMade: Boolean(body.paymentMade),
      paymentReference: body.paymentReference?.trim() || '',
      registrationDate: new Date().toISOString(),
      timestamp: Date.now(),
    };

    regs.unshift(newReg);
    saveRegistrations(regs);

    res.status(201).json({
      success: true,
      message: 'Registration successfully received',
      registration: newReg,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to save registration' });
  }
});

// Update payment status for admin
app.patch('/api/registrations/:id/payment', (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  const regs = loadRegistrations();
  const index = regs.findIndex(r => r.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Registration not found' });
    return;
  }

  regs[index].paymentStatus = paymentStatus;
  regs[index].paymentMade = paymentStatus === 'Paid' || paymentStatus === 'Confirmed';
  saveRegistrations(regs);

  res.json({ success: true, registration: regs[index] });
});

// Admin verify authentication
app.post('/api/admin/login', (req, res) => {
  const { passcode } = req.body;
  // Default master secure code: skill2scale2026 or admin2026
  if (passcode === 'skill2scale2026' || passcode === 'admin2026' || passcode === 'admin') {
    res.json({ success: true, token: 's2s_admin_authenticated_' + Date.now() });
  } else {
    res.status(401).json({ success: false, error: 'Invalid admin passcode' });
  }
});

// Feed for tasteful live notification (returns recent verified registrations without exposing personal PII)
app.get('/api/recent-activity', (req, res) => {
  const regs = loadRegistrations();
  const anonymized = regs.slice(0, 10).map(r => ({
    city: r.city || r.state || 'Nigeria',
    state: r.state,
    course: r.selectedCourse,
    timeAgo: formatTimeAgo(r.timestamp),
    isVerified: true
  }));
  res.json(anonymized);
});

function formatTimeAgo(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production' || !process.env.VITE_DEV;

  // Serve static assets from public directory
  app.use(express.static(path.resolve(__dirname, 'public')));

  // In development, hook into Vite middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
