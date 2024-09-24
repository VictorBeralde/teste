import { CardOng } from "./CardOng"
import ong from "../../assets/ong.png" 
import ImageCampanha from '../../components/CardCampanha/campanha.svg';
import { useState } from "react"

export default {
    title: 'Components/CardOng'
}

const items = [
    ong, ImageCampanha, ong, ImageCampanha
]

export const Default = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };
    return (
        <>
            <CardOng 
                images={[]}
                currentIndex={currentIndex}
                handleNext={handleNext}
                handlePrev={handlePrev}
                email="teste@gmail.com"
                phone={123456789}
                title="Ong Teste"
                idDonor="1"
                isFavorite={false}
                idOng="1"
                link="https://www.google.com.br"
            />
        </>
    )
}