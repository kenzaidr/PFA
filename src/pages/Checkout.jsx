import { useState, useRef } from 'react';
import { Icons } from '../components/Icons';
import { useRouter } from '../router';

/* ─── Animated Credit Card ──────────────────────────────── */
function CreditCardPreview({ num, name, expiry, flipped }) {
  const display = num.replace(/\s/g, '').padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim();

  return (
    <div className="relative w-full max-w-[360px] h-48 mx-auto" style={{ perspective: '1000px' }}>
      <div
        className="relative w-full h-full transition-all duration-700"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-800 to-blue-900" />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(0,153,204,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,180,216,0.2) 0%, transparent 50%)'
          }} />
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1.5">
                <Icons.Logo className="w-6 h-6 opacity-80" />
                <span className="text-white/70 text-xs font-semibold">ESISA Payment</span>
              </div>
              <div className="text-right">
                <div className="text-white/40 text-[9px] font-semibold uppercase tracking-widest">VISA</div>
                <div className="flex gap-1 mt-1">
                  <div className="w-6 h-4 rounded-sm bg-yellow-400/80" />
                  <div className="w-6 h-4 rounded-sm bg-red-400/80 -ml-3" />
                </div>
              </div>
            </div>
            <div>
              <div className="font-mono text-lg text-white tracking-widest mb-3" style={{ letterSpacing: '0.08em' }}>
                {display}
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-white/40 text-[8px] uppercase tracking-widest mb-0.5">Titulaire</div>
                  <div className="text-white text-sm font-semibold uppercase">{name || 'VOTRE NOM'}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/40 text-[8px] uppercase tracking-widest mb-0.5">Expire</div>
                  <div className="text-white text-sm font-mono">{expiry || 'MM/AA'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
          <div className="mt-8 mx-0 h-10 bg-slate-700" />
          <div className="px-6 mt-4 flex items-center justify-end gap-3">
            <div className="flex-1 h-8 bg-white/[0.08] rounded" />
            <div className="w-14 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-slate-800 text-sm font-black font-mono">CVV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PayPal Logo ───────────────────────────────────────── */
function PayPalLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.068-8.558 6.068h-2.19c-1.57 0-2.906 1.147-3.15 2.7l-1.33 8.43c-.085.54.323 1.03.869 1.03H9.59c.524 0 .968-.383 1.05-.9l.41-2.596.055-.347h.001c.08-.517.524-.9 1.05-.9h.66c3.574 0 6.37-1.452 7.187-5.651.345-1.773.167-3.25-.78-4.547z"/>
    </svg>
  );
}

/* ─── Bank Icon ─────────────────────────────────────────── */
function BankIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/>
      <line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/>
      <polygon points="12 2 20 7 4 7"/>
    </svg>
  );
}

function CardIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );
}

/* ─── CHECKOUT PAGE ─────────────────────────────────────── */
export default function Checkout() {
  const { navigate, routeState } = useRouter();
  const plan = routeState?.plan || 'Pro Candidat';
  const price = routeState?.price || '49 DH/mois';

  const [method, setMethod] = useState('card');
  const [card, setCard] = useState({ num: '', name: '', expiry: '', cvv: '' });
  const [bank, setBank] = useState({ name: '', rib: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const cvvRef = useRef(null);

  const setC = (k) => (e) => {
    let v = e.target.value;
    if (k === 'num') v = v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (k === 'expiry') {
      v = v.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
    }
    if (k === 'cvv') v = v.replace(/\D/g, '').slice(0, 4);
    setCard((p) => ({ ...p, [k]: v }));
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 2200);
  };

  const isFocusCvv = useRef(false);

  const METHODS = [
    { id: 'card',    label: 'Carte bancaire', Icon: CardIcon,    sub: 'Visa · Mastercard · CMI' },
    { id: 'bank',    label: 'Virement',        Icon: BankIcon,    sub: 'RIB Maroc · IBAN' },
    { id: 'paypal',  label: 'PayPal',          Icon: PayPalLogo,  sub: 'Paiement sécurisé' },
  ];

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] grid-bg flex items-center justify-center px-5 py-16">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-5xl">
            🎉
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-3">Paiement confirmé !</h1>
          <p className="text-slate-400 mb-2">Tu as souscrit au plan <strong className="text-white">{plan}</strong>.</p>
          <p className="text-slate-500 text-sm mb-8">Un email de confirmation a été envoyé. Ton accès est activé immédiatement.</p>
          <div className="space-y-3">
            <button onClick={() => navigate('dashboard-student')}
              className="btn-primary w-full py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer">
              <span className="relative z-10">Accéder à mon espace →</span>
            </button>
            <button onClick={() => navigate('home')}
              className="btn-secondary w-full py-3 rounded-2xl text-sm font-semibold text-slate-300 cursor-pointer">
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] grid-bg px-5 py-12">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 cursor-pointer group text-sm">
          <Icons.ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Retour
        </button>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* ─── Left: Payment form ─── */}
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight mb-1">Finaliser le paiement 💳</h1>
              <p className="text-slate-400 text-sm">Paiement 100% sécurisé · Données chiffrées SSL · PCI-DSS</p>
            </div>

            {/* Express pay */}
            <div className="glass gradient-border rounded-2xl p-5">
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Paiement express</div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button"
                  className="btn-secondary py-3 rounded-xl text-sm font-bold text-slate-200 cursor-pointer flex items-center justify-center gap-2 border border-white/[0.08]">
                  <svg className="w-5 h-4" viewBox="0 0 24 10" fill="currentColor"><text y="9" fontSize="9" fontWeight="bold" fill="white" fontFamily="sans-serif">Google Pay</text></svg>
                </button>
                <button type="button"
                  className="btn-secondary py-3 rounded-xl text-sm font-bold text-slate-200 cursor-pointer flex items-center justify-center gap-2 border border-white/[0.08]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <span>Apple Pay</span>
                </button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex-1 h-px bg-white/[0.07]" />
                <span className="text-xs text-slate-600 font-medium">ou choisir un mode</span>
                <div className="flex-1 h-px bg-white/[0.07]" />
              </div>
            </div>

            {/* Method tabs */}
            <div className="glass gradient-border rounded-2xl overflow-hidden">
              <div className="flex border-b border-white/[0.06]">
                {METHODS.map((m) => (
                  <button key={m.id} id={`pay-${m.id}`} onClick={() => setMethod(m.id)}
                    className={`flex-1 py-4 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      method === m.id ? 'bg-white/[0.06] border-b-2 border-blue-400' : 'hover:bg-white/[0.03]'
                    }`}>
                    <m.Icon className={`w-5 h-5 ${method === m.id ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span className={`text-xs font-bold ${method === m.id ? 'text-white' : 'text-slate-500'}`}>{m.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* ─── CARD FORM ─── */}
                {method === 'card' && (
                  <form onSubmit={submit} className="space-y-5">
                    <CreditCardPreview
                      num={card.num}
                      name={card.name}
                      expiry={card.expiry}
                      flipped={isFocusCvv.current}
                    />
                    <div className="space-y-4 mt-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Numéro de carte</label>
                        <input id="card-num" type="text" inputMode="numeric" value={card.num} onChange={setC('num')} required
                          placeholder="1234 5678 9012 3456"
                          className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-700 outline-none transition-colors font-mono tracking-widest" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Titulaire de la carte</label>
                        <input id="card-name" type="text" value={card.name} onChange={setC('name')} required
                          placeholder="PRÉNOM NOM"
                          className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-700 outline-none transition-colors uppercase" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Date d'expiration</label>
                          <input id="card-expiry" type="text" inputMode="numeric" value={card.expiry} onChange={setC('expiry')} required
                            placeholder="MM/AA"
                            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-700 outline-none transition-colors font-mono" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">CVV / CVC</label>
                          <input id="card-cvv" type="text" inputMode="numeric" value={card.cvv} onChange={setC('cvv')} required
                            placeholder="•••"
                            ref={cvvRef}
                            onFocus={() => { isFocusCvv.current = true; setCard((p) => ({ ...p })); }}
                            onBlur={() => { isFocusCvv.current = false; setCard((p) => ({ ...p })); }}
                            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-700 outline-none transition-colors font-mono" />
                        </div>
                      </div>
                    </div>
                    <button id="pay-card-submit" type="submit" disabled={loading}
                      className={`btn-primary w-full py-4 rounded-2xl text-base font-black text-white cursor-pointer flex items-center justify-center gap-2.5 mt-2 ${loading ? 'opacity-70' : ''}`}>
                      {loading
                        ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span className="relative z-10">Traitement en cours...</span></>
                        : <><Icons.Shield className="w-5 h-5 relative z-10" /><span className="relative z-10">Payer {price} en toute sécurité</span></>
                      }
                    </button>
                  </form>
                )}

                {/* ─── BANK TRANSFER ─── */}
                {method === 'bank' && (
                  <div className="space-y-5">
                    <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.06] space-y-4">
                      <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Coordonnees bancaires ESISA</div>
                      {[
                        ['Beneficiaire', 'ESISA Services'],
                        ['Banque', 'Attijariwafa Bank · Maroc'],
                        ['RIB', '007 780 0000123456789012 26'],
                        ['IBAN', 'MA64 0078 0000 1234 5678 9012 26'],
                        ['BIC / SWIFT', 'BCMAMAMC'],
                      ].map(([l, v]) => (
                        <div key={l} className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{l}</span>
                          <span className="text-sm text-white font-mono">{v}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-600/8 border border-blue-600/25 rounded-2xl p-4">
                      <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1">⚠️ Important — Référence obligatoire</div>
                      <div className="text-white font-mono font-black text-lg tracking-widest bg-white/[0.06] rounded-xl px-4 py-2.5 border border-white/[0.1]">
                        SKM-2026-{Math.random().toString(36).slice(2, 8).toUpperCase()}
                      </div>
                      <p className="text-slate-400 text-xs mt-2">Inclure cette référence dans le libellé de ton virement pour une activation automatique.</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Ton nom (pour confirmation)</label>
                        <input type="text" value={bank.name} onChange={(e) => setBank((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Ayman Benali"
                          className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Ton RIB (pour remboursement éventuel)</label>
                        <input type="text" value={bank.rib} onChange={(e) => setBank((p) => ({ ...p, rib: e.target.value }))}
                          placeholder="007 780 0000..."
                          className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors font-mono" />
                      </div>
                    </div>

                    <button id="pay-bank-submit" onClick={submit} disabled={loading}
                      className={`btn-primary w-full py-4 rounded-2xl text-base font-black text-white cursor-pointer flex items-center justify-center gap-2.5 ${loading ? 'opacity-70' : ''}`}>
                      {loading
                        ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span className="relative z-10">Vérification...</span></>
                        : <><BankIcon className="w-5 h-5 relative z-10" /><span className="relative z-10">J'ai effectué le virement</span></>
                      }
                    </button>
                    <p className="text-xs text-slate-600 text-center">Activation sous 24–48h après réception du virement</p>
                  </div>
                )}

                {/* ─── PAYPAL ─── */}
                {method === 'paypal' && (
                  <div className="space-y-5 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#003087]/30 border border-[#003087]/50 flex items-center justify-center mx-auto">
                      <PayPalLogo className="w-10 h-10 text-[#009cde]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Paiement via PayPal</h3>
                      <p className="text-slate-400 text-sm mt-1">Tu seras redirigé vers PayPal pour finaliser le paiement en toute sécurité.</p>
                    </div>
                    <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.06] text-left space-y-2">
                      {[
                        'Paiement sécurisé par PayPal',
                        'Aucun compte PayPal requis (carte acceptée)',
                        'Protection acheteur incluse',
                        'Remboursement simplifié si nécessaire',
                      ].map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                          <Icons.Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <button id="pay-paypal-submit" onClick={submit} disabled={loading}
                      className={`w-full py-4 rounded-2xl text-base font-black text-white cursor-pointer flex items-center justify-center gap-2.5 transition-all ${
                        loading ? 'opacity-70 bg-[#009cde]' : 'bg-[#009cde] hover:bg-[#00b3f4] hover:-translate-y-0.5 shadow-lg shadow-[#009cde]/30'
                      }`}>
                      {loading
                        ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Redirection...</span></>
                        : <><PayPalLogo className="w-5 h-5" /><span>Payer avec PayPal</span></>
                      }
                    </button>
                    <p className="text-xs text-slate-600">Activation immédiate après confirmation PayPal</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── Right: Order Summary ─── */}
          <div className="glass gradient-border rounded-3xl overflow-hidden sticky top-24">
            <div className="p-6 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Récapitulatif</div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center">
                  <Icons.Spark className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-black">{plan}</div>
                  <div className="text-slate-400 text-sm">ESISA Portal · Acces Pro</div>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  ['Abonnement', price],
                  ['Frais de traitement', 'Gratuit'],
                  ['TVA (0%)', '0 DH'],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-sm">
                    <span className="text-slate-400">{l}</span>
                    <span className="text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-bold">Total</span>
                <span className="text-2xl font-black text-white">{price}</span>
              </div>

              {/* Features included */}
              <div className="space-y-2 mb-6">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Inclus dans ce plan</div>
                {[
                  'Boost algorithmique ×3',
                  'Matching haute fréquence',
                  'Simulations IA illimitées',
                  'Roadmap personnalisée',
                  'Analyse marché temps réel',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Icons.Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              {/* Security badges */}
              <div className="border-t border-white/[0.06] pt-5 space-y-2">
                {[
                  { icon: Icons.Shield, text: 'SSL 256-bit · PCI-DSS compliant' },
                  { icon: Icons.Zap,    text: 'Activation immédiate' },
                  { icon: Icons.X,      text: 'Annulation à tout moment' },
                ].map(({ icon: Ic, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
                    <Ic className="w-3.5 h-3.5 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


