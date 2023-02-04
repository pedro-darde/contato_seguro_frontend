import { Grid, Container, Card, Typography } from '@mui/joy'
import Button from '@mui/joy/Button';
import { useHistory } from 'react-router-dom';
export default function HomePage() {
    const history = useHistory();
    return (
        <Container maxWidth="sm">
            <Card variant="outlined">
                <Typography level="h2" fontSize="xl" variant='plain' sx={{ mb: 0.5, textAlign: "center", fontWeight: "bold"}}>
                    Escolha o que deseja fazer
                </Typography>
                <Grid container spacing={2} sx={{ flexGrow: 1, alignContent: "center", justifyContent: "center"}}>
                    <Grid xs={6}>
                        <Button color="neutral" fullWidth onClick={() => history.push('/users')}> Usuarios </Button>
                    </Grid>
                    <Grid xs={6}>
                        <Button  color="neutral" fullWidth onClick={() => history.push('/companies')}> Empresas </Button>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}