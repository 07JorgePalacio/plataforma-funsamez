import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-surface flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            
            {/* Un pequeño footer genérico para las vistas públicas */}
            <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-body-small text-on-surface-variant font-medium">
                        © {new Date().getFullYear()} FUNSAMEZ. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}