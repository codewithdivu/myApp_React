// @mui
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AboutHero, AboutTeam, AboutVision } from '../sections/about';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function About() {
  return (
    <Page title="About us">
      <RootStyle>
        <AboutHero />

        <AboutVision />

        <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

        <AboutTeam />
      </RootStyle>
    </Page>
  );
}
