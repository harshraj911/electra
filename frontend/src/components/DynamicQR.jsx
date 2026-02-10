import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

const DynamicQR = ({ game, teamType, upiId = "9631627055@ptaxis", payeeName = "Harsh Raj" }) => {
    const qrRef = useRef();

    // Fee logic based on user's new requirements
    const getFee = () => {
        if (game === 'Badminton') {
            return teamType === 'Single' ? 59 : 99;
        }
        if (game === 'Volleyball') {
            return teamType === 'Single' ? 59 : 249;
        }
        return 0;
    };

    const amount = getFee();
    const note = `Ground Clash - ${game} ${teamType}`;

    // UPI payment link format: upi://pay?pa=UPI_ID&pn=PAYEE_NAME&am=AMOUNT&cu=INR&tn=NOTE
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = url;
            link.download = `Payment_QR_${game}_${teamType}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 glass-morphism rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 animate-fade-in-up">
            <div className="relative group p-3 sm:p-4 bg-white rounded-2xl sm:rounded-3xl shadow-2xl" id="qr-container" ref={qrRef}>
                <QRCodeCanvas
                    value={upiLink}
                    size={window.innerWidth < 640 ? 180 : 220}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                        src: "/logo.png",
                        x: undefined,
                        y: undefined,
                        height: window.innerWidth < 640 ? 30 : 40,
                        width: window.innerWidth < 640 ? 30 : 40,
                        excavate: true,
                    }}
                />

                {/* Scanner animation overlay */}
                <div className="absolute inset-3 sm:inset-4 pointer-events-none overflow-hidden rounded-xl">
                    <div className="w-full h-1 bg-primary/40 animate-scanner absolute top-0 left-0"></div>
                </div>
            </div>

            <div className="text-center space-y-2 sm:space-y-3">
                <div className="px-4 py-1 sm:px-6 sm:py-2 bg-primary/10 rounded-full inline-block border border-primary/20">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary italic">Payable Amount</span>
                </div>

                <h4 className="font-accent text-4xl sm:text-5xl italic text-white text-glow-cyan leading-none">₹{amount}</h4>

                <div className="space-y-1">
                    <p className="text-[10px] sm:text-[11px] font-black uppercase text-white/40 tracking-[0.1em] sm:tracking-[0.2em]">{payeeName}</p>
                    <p className="text-[8px] sm:text-[9px] font-bold text-primary italic underline underline-offset-4 decoration-primary/20">{upiId}</p>
                </div>

                <div className="bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 mt-3 sm:mt-4">
                    <p className="text-[7px] sm:text-[8px] font-black uppercase text-white/20 tracking-widest mb-1">Transaction Note</p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-white/80 italic">{note}</p>
                </div>
            </div>

            <button
                onClick={downloadQR}
                className="w-full py-4 glass-morphism border-primary/30 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary hover:bg-primary hover:text-black transition-all rounded-xl sm:rounded-2xl active:scale-95 flex items-center justify-center gap-2 sm:gap-3"
            >
                <span className="text-base sm:text-lg">💾</span> DOWNLOAD QR
            </button>

            <p className="text-[7px] sm:text-[8px] font-bold uppercase text-white/20 tracking-[0.05em] sm:tracking-[0.1em] italic mt-1 sm:mt-2">
                Scan using any UPI App (GPay, PhonePe, Paytm)
            </p>
        </div>
    );
};

export default DynamicQR;
