import { MenuOng } from './MenuOng';

export default {
  title: 'Components/MenuOng',
  component: MenuOng,
};

export const Template = () => {
    return (
        <MenuOng 
            variant='permanent'
            matches={true}
        />
    )
};