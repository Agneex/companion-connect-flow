import { QRCodeSVG } from "qrcode.react";
import companyaLogo from "@/assets/companya-logo.png";

interface TicketProps {
  tokenId: string;
  silverName: string;
  city: string;
}

export const PrintableTicket = ({ tokenId, silverName, city }: TicketProps) => {
  const qrValue = `COMPANYA-TOKEN-${tokenId}`;
  
  return (
    <div className="ticket-page-break bg-white text-black p-8 rounded-lg border-4 border-primary shadow-xl w-[400px] mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
        <img 
          src={companyaLogo} 
          alt="Companya" 
          className="h-12 mx-auto mb-3"
        />
        <h2 className="text-2xl font-bold text-primary mb-1">TICKET COMPANYA</h2>
        <p className="text-sm text-gray-600">Ticket de Acompañamiento</p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center my-6 bg-white p-4 rounded-lg">
        <QRCodeSVG 
          value={qrValue}
          size={200}
          level="H"
          includeMargin
        />
      </div>

      {/* Ticket Info */}
      <div className="space-y-3 mb-6">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-xs text-gray-600 mb-1">Token ID</p>
          <p className="text-xl font-bold text-primary">#{tokenId}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-xs text-gray-600 mb-1">Para</p>
          <p className="text-lg font-semibold">{silverName}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-xs text-gray-600 mb-1">Ciudad</p>
          <p className="text-lg font-semibold">{city}</p>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="border-t-2 border-gray-300 pt-4">
        <h3 className="font-bold text-sm mb-2">Cómo usar este ticket:</h3>
        <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
          <li>Presenta este ticket al acompañante</li>
          <li>El acompañante escaneará el código QR</li>
          <li>Confirma la actividad realizada</li>
          <li>El ticket se registrará en blockchain</li>
        </ol>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Válido para 1 acompañamiento • Registro on-chain
        </p>
        <p className="text-xs text-gray-400 mt-1">
          companya.app
        </p>
      </div>
    </div>
  );
};

interface TicketGeneratorProps {
  tickets: TicketProps[];
  onPrint: () => void;
}

export const TicketGenerator = ({ tickets, onPrint }: TicketGeneratorProps) => {
  return (
    <div>
      {/* Print Button - Hidden when printing */}
      <div className="no-print mb-8 text-center">
        <button
          onClick={onPrint}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity print:hidden"
        >
          🖨️ Imprimir Tickets ({tickets.length})
        </button>
        <p className="text-sm text-muted-foreground mt-2">
          Los tickets se imprimirán uno por página
        </p>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
        {tickets.map((ticket, index) => (
          <PrintableTicket key={index} {...ticket} />
        ))}
      </div>

      {/* Print Layout - One ticket per page */}
      <div className="print-only">
        {tickets.map((ticket, index) => (
          <div key={index} className="print-page">
            <PrintableTicket {...ticket} />
          </div>
        ))}
      </div>
    </div>
  );
};
