import { MessageCircle, Mail } from 'lucide-react';

export default function Contato() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá, gostaria de falar sobre meu caso.', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:contato@advogado.com?subject=Consulta sobre cálculo penal';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="font-bold">Fale com um especialista</h1>

          <p className="text-gray-600">
            Um advogado pode analisar seu caso com precisão e te orientar melhor.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </button>

          <button
            onClick={handleEmail}
            className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5" />
            Email
          </button>
        </div>
      </div>
    </div>
  );
}
