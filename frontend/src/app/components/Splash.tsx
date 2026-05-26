import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Scale } from 'lucide-react';

export default function Splash() {

    const navigate = useNavigate();

    const [apiStatus, setApiStatus] = useState('Conectando backend...');

    useEffect(() => {

        fetch('http://localhost:8080/api/status')
            .then((res) => res.json())
            .then((data) => {
                setApiStatus(JSON.stringify(data));
            })
            .catch(() => {
                setApiStatus('Erro ao conectar backend');
            });

    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">

            <div className="max-w-md w-full text-center space-y-8">

                <div className="flex justify-center">
                    <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center">
                        <Scale className="w-12 h-12 text-white" />
                    </div>
                </div>

                <div className="space-y-4">

                    <h1 className="font-bold">
                        Calculadora Penal
                    </h1>

                    <p className="text-gray-600">
                        Descubra rapidamente quando é possível progredir de regime
                        ou obter benefícios legais.
                    </p>

                    <div className="bg-gray-100 rounded-lg p-3 text-sm">
                        <strong>Status API:</strong>
                        <br />
                        {apiStatus}
                    </div>

                </div>

                <button
                    onClick={() => navigate('/form')}
                    className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition-colors"
                >
                    INICIAR CÁLCULO
                </button>

            </div>

        </div>
    );
}