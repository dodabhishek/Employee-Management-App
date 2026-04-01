import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { getAllEmployees } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Card, CardContent, Grid, Typography, Box, CircularProgress, Container, alpha, useTheme } from '@mui/material';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const theme = useTheme();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [employeeGrowth, setEmployeeGrowth] = useState([]);
  const [ageRangeData, setAgeRangeData] = useState({});
  const [genderData, setGenderData] = useState({});
  const [workModeData, setWorkModeData] = useState({});
  const [sentimentData, setSentimentData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const employees = await getAllEmployees();
        const departments = await getAllDepartments();
        
        setEmployeeCount(employees.length);
        setDepartmentCount(departments.length);

        // 1. Average Age
        const totalAge = employees.reduce((sum, emp) => sum + emp.age, 0);
        const avgAge = employees.length ? (totalAge / employees.length).toFixed(1) : 0;
        setAverageAge(avgAge);

        // 2. Age Demographics
        const ageRanges = { '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60+': 0 };
        // 3. Gender Matrix
        const genders = { 'Male Identifying': 0, 'Female Identifying': 0, 'Non-Binary': 0, 'Other': 0 };
        // 4. Work Config
        const modes = { 'Onsite': 0, 'Remote': 0, 'Hybrid': 0 };
        // 5. Sentiment
        const sentiments = { 'Positive': 0, 'Neutral': 0, 'Negative': 0 };

        employees.forEach(emp => {
          // Age
          if (emp.age >= 20 && emp.age <= 29) ageRanges['20-29'] += 1;
          else if (emp.age >= 30 && emp.age <= 39) ageRanges['30-39'] += 1;
          else if (emp.age >= 40 && emp.age <= 49) ageRanges['40-49'] += 1;
          else if (emp.age >= 50 && emp.age <= 59) ageRanges['50-59'] += 1;
          else if (emp.age >= 60) ageRanges['60+'] += 1;

          // Gender
          if (genders.hasOwnProperty(emp.gender)) genders[emp.gender] += 1;
          else genders['Other'] += 1;

          // Mode
          if (modes.hasOwnProperty(emp.workMode)) modes[emp.workMode] += 1;

          // Sentiment
          if (emp.satisfactionScore >= 4) sentiments['Positive'] += 1;
          else if (emp.satisfactionScore === 3) sentiments['Neutral'] += 1;
          else sentiments['Negative'] += 1;
        });

        setAgeRangeData(ageRanges);
        setGenderData(genders);
        setWorkModeData(modes);
        setSentimentData(sentiments);

        // 6. Growth Velocity (Real Timeline)
        const growthMap = {};
        employees.sort((a, b) => new Date(a.hireDate) - new Date(b.hireDate)).forEach(emp => {
          const date = new Date(emp.hireDate);
          const key = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
          growthMap[key] = (growthMap[key] || 0) + 1;
        });

        let runningTotal = 0;
        const timeline = Object.entries(growthMap).map(([label, count]) => {
          runningTotal += count;
          return { label, count: runningTotal };
        });
        setEmployeeGrowth(timeline);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { 
          color: theme.palette.text.secondary, 
          font: { family: 'Inter', weight: 600 } 
        }
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        backdropFilter: 'blur(10px)'
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: theme.palette.divider }, 
        ticks: { color: theme.palette.text.secondary } 
      },
      x: { 
        grid: { display: false }, 
        ticks: { color: theme.palette.text.secondary } 
      }
    }
  };

  const pieOptions = {
    ...chartOptions,
    scales: { y: { display: false }, x: { display: false } }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress thickness={5} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 14, mb: 10 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" className="gradient-text" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.02em' }}>
          Intelligence Matrix
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '1.2rem', fontWeight: 500 }}>
          Real-time workforce parameters and operational velocity.
        </Typography>
      </Box>

      {/* Top Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { label: 'Active Roster', value: employeeCount, color: theme.palette.primary.main },
          { label: 'Avg Maturity', value: `${averageAge} yrs`, color: theme.palette.secondary.main },
          { label: 'Strategic Units', value: departmentCount, color: '#ec4899' }
        ].map((stat, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ borderLeft: `6px solid ${stat.color}`, background: alpha(stat.color, theme.palette.mode === 'dark' ? 0.05 : 0.03) }}>
              <CardContent sx={{ p: 4 }}>
                <Typography sx={{ color: 'text.secondary', fontWeight: 800, mb: 1, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem' }}>
                  {stat.label}
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.04em' }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Growth Velocity */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: 450 }}>
            <CardContent sx={{ height: '100%', p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>Roster Growth Cycle</Typography>
              <Box sx={{ height: 320 }}>
                {employeeGrowth.length > 0 ? (
                  <Line 
                    data={{
                      labels: employeeGrowth.map(d => d.label),
                      datasets: [{
                        label: 'Operational Capacity',
                        data: employeeGrowth.map(d => d.count),
                        borderColor: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: theme.palette.primary.main,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 3,
                        pointRadius: 5
                      }]
                    }} 
                    options={chartOptions} 
                  />
                ) : (
                  <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: alpha(theme.palette.primary.main, 0.02), borderRadius: 4 }}>
                    <Typography color="text.secondary">Insufficient data for velocity analysis.</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Age Demographics */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: 450 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>Age Demographics</Typography>
              <Box sx={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Pie 
                  data={{
                    labels: Object.keys(ageRangeData),
                    datasets: [{
                      data: Object.values(ageRangeData),
                      backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main, '#ec4899', '#f59e0b', '#10b981'],
                      borderWidth: 0,
                      hoverOffset: 15
                    }]
                  }} 
                  options={pieOptions} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Work Config */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: 400 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>Deployment Config</Typography>
              <Box sx={{ height: 280 }}>
                <Bar 
                  data={{
                    labels: Object.keys(workModeData),
                    datasets: [{
                      label: 'Network Nodes',
                      data: Object.values(workModeData),
                      backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main, '#ec4899'],
                      borderRadius: 12
                    }]
                  }} 
                  options={chartOptions} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sentiment Analysis */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: 400 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>Sentiment Index</Typography>
              <Box sx={{ height: 280 }}>
                <Pie 
                  data={{
                    labels: Object.keys(sentimentData),
                    datasets: [{
                      data: Object.values(sentimentData),
                      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                      borderWidth: 0
                    }]
                  }} 
                  options={pieOptions} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Identity Matrix */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: 400 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>Identity Matrix</Typography>
              <Box sx={{ height: 280 }}>
                <Bar 
                  data={{
                    labels: Object.keys(genderData),
                    datasets: [{
                      label: 'Identity Distribution',
                      data: Object.values(genderData),
                      backgroundColor: ['#3b82f6', '#ec4899', '#8b5cf6', '#94a3b8'],
                      borderRadius: 12
                    }]
                  }} 
                  options={chartOptions} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
