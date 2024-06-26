import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import SocialsButton from '../../components/SocialsButton';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const theme = useTheme();

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Our Team
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Meet Our E-commerce Experts
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 630,
            mb: 6,
            color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
          }}
        >
          Our dedicated team is here to support you with any issues you may have. Expect a response within a day, along
          with comprehensive documentation to guide you.
        </Typography>
      </m.div>

      <Box>
        <Box component={m.div} variants={varFade().in} sx={{ px: 1.5, py: 5 }}>
          <Card sx={{ p: 3, maxWidth: 345, mx: 'auto' }}>
            <Image
              alt="Divyesh"
              src="https://avatars.githubusercontent.com/u/74129812?s=400&u=0a526e466bc8ebe3563e038c3631e4cbc7728922&v=4"
              ratio="1/1"
              sx={{ borderRadius: 1.5, mb: 2 }}
            />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
              Mavadiya Divyesh
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Software Engineer
            </Typography>
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <SocialsButton sx={{ color: 'action.active' }} />
            </Stack>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
