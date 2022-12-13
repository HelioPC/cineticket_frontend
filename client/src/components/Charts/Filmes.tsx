import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import TabletIcon from '@mui/icons-material/Tablet';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const FilmesMaisAssistidos = () => {
    const theme = useTheme();

    const data = {
        datasets: [
            {
                data: [63, 15, 22],
                backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
                borderWidth: 8,
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF'
            }
        ],
        labels: ['Ação', 'Terror', 'Comédia']
    };

    const options: any = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
        display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    const devices = [
        {
            title: 'Ação',
            value: 63,
            icon: SportsMartialArtsIcon,
            color: '#3F51B5'
        },
        {
            title: 'Terror',
            value: 15,
            icon: TabletIcon,
            color: '#E53935'
        },
        {
            title: 'Comédia',
            value: 23,
            icon: SentimentVerySatisfiedIcon,
            color: '#FB8C00'
        }
    ];

    return (
        <Card className='mt-20'>
            <CardHeader title="Categorias mais vistas" />
            
            <Divider />
            
            <CardContent>
                <Box sx={{height: 300,mposition: 'relative'}}>
                    <Doughnut data={data} options={options} />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                    {devices.map(({ color, icon: Icon, title, value }) => (
                        <Box key={title} sx={{ p: 1, textAlign: 'center' }}>
                            <Icon color="action" />
                            
                            <Typography color="textPrimary" variant="body1">
                                {title}
                            </Typography>
                            
                            <Typography style={{ color }} variant="h4">
                                {value} %
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default FilmesMaisAssistidos;
