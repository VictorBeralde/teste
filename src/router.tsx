import { createBrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BaseLayout } from './components/BaseLayout';
import { Campanha } from './pages/Campanha';
import { Doacao } from './pages/Doacao';
import { FazABoa } from './pages/FazABoa';
import { Home } from './pages/Home';
import { MinhasDoacoes } from './pages/MinhasDoacoes';
import { PerfilDoador } from './pages/PerfilDoador';
import { Ong } from './pages/Ong';
import { FormularioDoador, RecuperarSenha } from './pages/SiteInstitucional'
import { LocalizarOng } from './pages/LocalizarOng';
import { Triagem } from './pages/Triagem';
import { CampaignsIndexPage } from './pages/Campaigns/CampaignsIndexPage';
import { CampaignByIdPage } from './pages/Campaigns/CampaignByIdPage';
import { CreateEvent } from './pages/Events/CreateEvent';
import { UpsertEvent } from './pages/Events/UpsertEvent';
import { DonationPix } from './pages/FazABoa/DonationPix';
import { CreateCampaignPage } from './pages/Campaigns/CreateCampaignPage';
import { UpsertCampaignForm } from './pages/Campaigns/components/UpsertCampaignForm/UpsertCampaignForm';
import { PerfilOng } from './pages/PerfilOng';
import { UpdateCampaignPage } from './pages/Campaigns/UpdateCampaignPage';
import { UpdateDonationPage } from './pages/FazABoa/UpdateDonationPage';
import { HomeScreen } from './pages/HomeScreen';
import { HomeScreenOng } from './pages/HomeScreenOng';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { RegisterOng } from './pages/RegisterOng';
import { RegisterOngForm } from './pages/RegisterOngForm';
import { EventsIndexPage } from './pages/Events/EventsIndexPage';
import { CreateCollectionPoints } from './pages/CollectionPoints/CreateCollectionPoints';
import { UpsertCollectionPoints } from './pages/CollectionPoints/components/UpsertCollectionPoints';
import { CollectionPointsIndexPage } from './pages/CollectionPoints/CollectionPointsIndexPage';
import { UpdateCollectionPointsById } from './pages/CollectionPoints/UpdateCollectionPointsById';

export const router = createBrowserRouter([
    { path: '/', element: <HomeScreen /> },
    { path: '/ongs', element: <HomeScreenOng /> },
    { path: '/cadastrar', element: <Register /> },
    { path: '/cadastrar/ong', element: <RegisterOng /> },
    { path: '/cadastrar/ong/formulario', element: <RegisterOngForm /> },
    { path: '/login', element: <Login /> },
    { path: '/formulario-doador', element: <FormularioDoador /> },
    { path: '/recuperar-senha', element: <RecuperarSenha /> },
    {
        path: '/',
        element: (
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <BaseLayout />
            </QueryParamProvider>
        ),
        children: [
            { path: '/home', element: <Home /> },
            { path: '/campanha', element: <Campanha /> },
            { path: '/campanhas', element: <CampaignsIndexPage /> },
            { path: '/campanhas/criar-campanha', element: <CreateCampaignPage /> },
            { path: '/campanhas/criar-campanha/formulario', element: <UpsertCampaignForm variant='create' /> },
            { path: '/campanhas/editar-campanha/:campaignId', element: <UpdateCampaignPage /> },
            { path: '/campanhas/:idCampanha', element: <CampaignByIdPage /> },
            { path: '/campanha/doacao/:idCampanha', element: <Doacao /> },
            { path: '/campanha/doacao/faz-a-boa/pix/:idCampanha', element: <DonationPix /> },
            { path: '/campanha/doacao/faz-a-boa/itens/:idCampanha', element: <FazABoa variant='create' /> },
            { path: '/campanha/doacao/editar/itens/:donationId', element: <UpdateDonationPage /> },
            { path: '/minhas-doacoes', element: <MinhasDoacoes /> },
            { path: '/perfil', element: <PerfilDoador /> },
            { path: '/perfil-ong', element: <PerfilOng /> },
            { path: '/ong/:idOng', element: <Ong /> },
            { path: '/localizar-ongs', element: <LocalizarOng /> },
            { path: '/eventos', element: <EventsIndexPage /> },
            { path: '/eventos/criar-evento', element: <CreateEvent /> },
            { path: '/eventos/criar-evento/formulario', element: <UpsertEvent variant='create' /> },
            { path: '/pontos-de-coleta', element: <CollectionPointsIndexPage /> },
            { path: '/pontos-de-coleta/criar-ponto-de-coleta', element: <CreateCollectionPoints /> },
            { path: '/pontos-de-coleta/criar-ponto-de-coleta/formulario', element: <UpsertCollectionPoints variant='create' /> },
            { path: '/pontos-de-coleta/editar-ponto-de-coleta/:idCollection', element: <UpdateCollectionPointsById /> },
            { path: '/triagem', element: <Triagem /> }
        ]
    }
]);
