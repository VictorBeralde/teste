import { Card, CardContent, Typography, Box } from "@mui/material";

export type CardObjectiveProps = {
    image: string
    title: string
    description: string
}

export function CardObjective(props: CardObjectiveProps) {
    const { image, title, description } = props;

    return (
        <Card 
            sx={{ 
                borderRadius: 2, 
                textAlign: 'center', 
                backgroundColor: "#fff", 
                position: 'relative',
                overflow: 'visible' 
            }}
        >
            <Box 
                component="img"
                src={image}
                alt="Slogan home"
                sx={{ 
                    backgroundColor: "#375A88",
                    width: '60%', 
                    height: 'auto', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    top: '-30%', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    padding: 5
                }}
            />
            <CardContent sx={{ paddingTop: '35%', marginTop: 5 }}>
                <Typography variant="h4">
                    {title}
                </Typography>
                <Typography variant="subtitle2" mt={3} mb={4}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
