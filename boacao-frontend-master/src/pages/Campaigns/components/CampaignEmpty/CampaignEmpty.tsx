import { Banner } from "../../../../components/Banner"
import CampaignEmptyImage from '../../../../assets/campaign_empty.svg'

export function CampaignEmpty () {
    return (
        <>
            <Banner
                img={CampaignEmptyImage}
            />
        </>
    )
}