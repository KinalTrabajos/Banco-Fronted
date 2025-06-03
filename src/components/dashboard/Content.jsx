import { Route, Routes} from 'react-router-dom';
import { PrincipalPage } from './PrincipalPage';

export const Content = () => {
    return (
        <Routes>
            <Route path="/" element={<PrincipalPage/>}/>
        </Routes>
    )
}