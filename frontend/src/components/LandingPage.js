import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const statCards = [
  { value: '84.50%', label: 'Data uptime in the last 12 months' },
  { value: '1.5 min', label: 'Average export turnaround' },
  { value: '2.7x', label: 'Faster approvals for managers' },
];

const quickFeatures = ['Faster onboarding', 'Role-based access', 'Export-ready data', 'Insightful dashboards'];

const benchmarks = [
  { value: '300', label: 'Active employee records maintained' },
  { value: '24', label: 'Departments organized' },
  { value: '4.2 hrs', label: 'Average onboarding cycle' },
  { value: '18 mo', label: 'Rolling audit history' },
  { value: '50+', label: 'Weekly exports delivered' },
  { value: '99.3%', label: 'Roster accuracy' },
];

const modules = [
  {
    title: 'Employee 360',
    desc: 'Full profiles, quick edits, exports, and smart filters for any slice of your org.',
    link: '/employees',
  },
  {
    title: 'Department clarity',
    desc: 'Keep teams organized with clean structures and quick pivots between units.',
    link: '/departments',
  },
  {
    title: 'Insightful dashboards',
    desc: 'Trend lines, cohorts, and composition charts to see what is moving the needle.',
    link: '/dashboard',
  },
];

const faqs = [
  {
    q: 'Can I export data for finance or ops reviews?',
    a: 'Yes. Use the built-in exports in employees and departments to get clean CSVs any time.',
  },
  {
    q: 'Does it support remote and hybrid tracking?',
    a: 'Dashboard charts visualize remote, onsite, and hybrid trends without additional setup.',
  },
  {
    q: 'How fast can we onboard?',
    a: 'Most teams are ready in a day: set roles, add departments, and import employees.',
  },
];

const LandingPage = () => {
  return (
    <Box sx={{ background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 70%)', py: { xs: 4, md: 7 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip label="EMPLOYEE MANAGEMENT" sx={{ mb: 2, fontWeight: 700, letterSpacing: '0.08em' }} />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, mb: 2, color: '#182042' }}>
            Run your workforce with clarity and confidence.
          </Typography>
          <Typography sx={{ maxWidth: 760, mx: 'auto', color: '#5a6180', fontSize: '1.05rem', mb: 3 }}>
            One place for dashboards, departments, and people operations - built for teams that need insights, not spreadsheets.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button component={Link} to="/dashboard" variant="contained" sx={{ px: 3, py: 1.2, fontWeight: 700 }}>
              View Dashboard
            </Button>
            <Button component={Link} to="/employees" variant="outlined" sx={{ px: 3, py: 1.2, fontWeight: 700 }}>
              Browse Directory
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 6 }}>
          {statCards.map(card => (
            <Grid item xs={12} md={4} key={card.value}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(23,31,73,0.08)' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e2b6f', mb: 0.5 }}>
                    {card.value}
                  </Typography>
                  <Typography sx={{ color: '#5e6685' }}>{card.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ justifyContent: 'center', mb: 6 }}>
          {quickFeatures.map(feature => (
            <Chip key={feature} label={feature} variant="outlined" sx={{ borderRadius: 1.5, fontWeight: 600 }} />
          ))}
        </Stack>

        <Box sx={{ mb: 7 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, color: '#182042', mb: 1 }}>
            Operational benchmarks at a glance
          </Typography>
          <Typography sx={{ textAlign: 'center', color: '#5a6180', mb: 3 }}>
            A single source of truth translates into measurable outcomes.
          </Typography>
          <Grid container spacing={2.5}>
            {benchmarks.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item.label}>
                <Card sx={{ borderRadius: 3, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e2b6f', mb: 0.5 }}>
                      {item.value}
                    </Typography>
                    <Typography sx={{ color: '#5e6685' }}>{item.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 7 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, color: '#182042', mb: 3 }}>
            Everything you need to operate smoothly
          </Typography>
          <Grid container spacing={2.5}>
            {modules.map(module => (
              <Grid item xs={12} md={4} key={module.title}>
                <Card sx={{ borderRadius: 3, height: '100%', boxShadow: '0 10px 24px rgba(23,31,73,0.08)' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2a6f', mb: 1 }}>
                      {module.title}
                    </Typography>
                    <Typography sx={{ color: '#5d6584', mb: 2 }}>{module.desc}</Typography>
                    <Button component={Link} to={module.link} variant="text" sx={{ fontWeight: 700 }}>
                      Open
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 7 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, color: '#182042', mb: 3 }}>
            FAQs
          </Typography>
          <Grid container spacing={2}>
            {faqs.map(faq => (
              <Grid item xs={12} md={4} key={faq.q}>
                <Card sx={{ borderRadius: 3, height: '100%' }}>
                  <CardContent>
                    <Typography sx={{ fontWeight: 700, color: '#1c275f', mb: 1 }}>{faq.q}</Typography>
                    <Typography sx={{ color: '#5d6584' }}>{faq.a}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #2b3d99 0%, #1d2b70 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Ready to see it live?
          </Typography>
          <Typography sx={{ opacity: 0.9, mb: 3 }}>
            Jump into the dashboard, filter employees, and ship updates without extra tooling.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button component={Link} to="/login" variant="contained" color="warning" sx={{ fontWeight: 700 }}>
              Sign In
            </Button>
            <Button component={Link} to="/register" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
              Create Account
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
