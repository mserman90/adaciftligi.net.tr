import React, { useState, useMemo, useEffect } from 'react';
import {
  ModuleKey,
  BesiInputs,
  SutInputs,
  KoyunInputs,
  KeciInputs,
  SutEkoInputs,
  BesiEkoInputs,
  GebTakvimInputs,
  KizTakvimInputs,
  IofcInputs,
  DamizlikInputs,
  FeedIngredient,
  RationResult,
  IofcRecord,
} from './types';
import { MODULES } from './data/modules';
import { DEFAULT_INGREDIENTS } from './data/ingredients';
import {
  hesaplaRasyonBesi,
  hesaplaRasyonSut,
  hesaplaRasyonKoyun,
  hesaplaRasyonKeci,
} from './utils/nutrition';
import { toInput, bugun0 } from './utils/formatters';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IngredientsTable } from './components/IngredientsTable';
import { RationResultView } from './components/RationResultView';
import { GuideModal } from './components/GuideModal';

import { BesiPanel } from './components/modules/BesiPanel';
import { SutPanel } from './components/modules/SutPanel';
import { KoyunPanel } from './components/modules/KoyunPanel';
import { KeciPanel } from './components/modules/KeciPanel';
import { SutEkoPanel } from './components/modules/SutEkoPanel';
import { BesiEkoPanel } from './components/modules/BesiEkoPanel';
import { GebTakvimPanel } from './components/modules/GebTakvimPanel';
import { KizTakvimPanel } from './components/modules/KizTakvimPanel';
import { IofcPanel } from './components/modules/IofcPanel';
import { DamizlikPanel } from './components/modules/DamizlikPanel';

import { SutEkoResultView } from './components/SutEkoResultView';
import { BesiEkoResultView } from './components/BesiEkoResultView';
import { GebTakvimResultView } from './components/GebTakvimResultView';
import { KizTakvimResultView } from './components/KizTakvimResultView';
import { IofcResultView } from './components/IofcResultView';
import { DamizlikResultView } from './components/DamizlikResultView';

import { Play, RotateCcw, AlertCircle, Sparkles, HelpCircle, History, CheckCircle2 } from 'lucide-react';
import { GlossaryProvider } from './components/GlossaryText';
import {
  saveLastRation,
  loadLastRation,
  clearLastRation,
  loadRationHistory,
  SavedLastRationState,
} from './utils/storage';

export interface RasyonAppProps {
  onBackToWebsite?: () => void;
  onLogout?: () => void;
  adminUsername?: string;
}

export const RasyonApp: React.FC<RasyonAppProps> = ({
  onBackToWebsite,
  onLogout,
  adminUsername = 'admin',
}) => {
  // Load ration history from localStorage on initial render
  const [rationHistory, setRationHistory] = useState<SavedLastRationState[]>(() => loadRationHistory());
  
  const [initialSavedRation] = useState<SavedLastRationState | null>(() => rationHistory.length > 0 ? rationHistory[0] : null);
  const [lastSavedInfo, setLastSavedInfo] = useState<string | null>(
    () => initialSavedRation?.savedAtFormatted || null
  );

  const [currentModule, setCurrentModule] = useState<ModuleKey>(() => {
    if (initialSavedRation?.module) {
      return initialSavedRation.module;
    }
    return 'besi';
  });
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Notify user if a previously saved ration was restored from localStorage
  useEffect(() => {
    if (initialSavedRation) {
      showToast(`Kayıtlı son rasyon (${initialSavedRation.savedAtFormatted}) yerel depodan geri yüklendi.`);
    }
  }, []);

  // State for all modules (initialized with saved inputs if available)
  const [besiInputs, setBesiInputs] = useState<BesiInputs>(() => {
    return (
      initialSavedRation?.inputs?.besi || {
        ka: 400,
        acab: 1200,
        kabaMin: 20,
      }
    );
  });

  const [sutInputs, setSutInputs] = useState<SutInputs>(() => {
    return (
      initialSavedRation?.inputs?.sut || {
        ka: 650,
        sut: 30,
        yag: 3.8,
        dim: 90,
        kabaMin: 40,
        ndfMin: 28,
      }
    );
  });

  const [koyunInputs, setKoyunInputs] = useState<KoyunInputs>(() => {
    return (
      initialSavedRation?.inputs?.koyun || {
        tip: 'kuzu',
        ka: 35,
        acab: 250,
        sut: 1.5,
        yavru: 'tek',
        kabaMin: 25,
      }
    );
  });

  const [keciInputs, setKeciInputs] = useState<KeciInputs>(() => {
    return (
      initialSavedRation?.inputs?.keci || {
        tip: 'oglak',
        ka: 25,
        acab: 180,
        sut: 2.5,
        yavru: 'tek',
        kabaMin: 30,
      }
    );
  });

  const [sutEkoInputs, setSutEkoInputs] = useState<SutEkoInputs>({
    verim: 30,
    fiyat: 14.5,
    lakt: 305,
    kuru: 60,
    yemL: 165,
    yemK: 65,
    isc: 35,
    vet: 15,
    ureme: 8,
    diger: 15,
    sabit: 8000,
    buzagi: 25000,
  });

  const [besiEkoInputs, setBesiEkoInputs] = useState<BesiEkoInputs>({
    ka0: 280,
    ka1: 600,
    acab: 1300,
    alis: 180,
    satis: 165,
    yem: 120,
    olum: 1.5,
    diger: 18,
  });

  const todayStr = useMemo(() => toInput(bugun0()), []);
  const [gebTakvimInputs, setGebTakvimInputs] = useState<GebTakvimInputs>({
    tur: 'inek',
    irk: 'holstein',
    tarih: todayStr,
  });

  const [kizTakvimInputs, setKizTakvimInputs] = useState<KizTakvimInputs>({
    tur: 'inek',
    irk: 'holstein',
    tarih: todayStr,
    adet: 3,
  });

  const [iofcInputs, setIofcInputs] = useState<IofcInputs>({
    verim: 30,
    fiyat: 14.5,
    yem: 165,
    suru: 50,
  });

  const [damizlikInputs, setDamizlikInputs] = useState<DamizlikInputs>({
    tur: 'inek',
    kupe: '',
    skorlar: {},
    bayraklar: [],
  });

  // Ingredients and selection (restored from saved ration if available)
  const [ingredients, setIngredients] = useState<FeedIngredient[]>(() => {
    if (initialSavedRation?.ingredients && initialSavedRation.ingredients.length > 0) {
      return initialSavedRation.ingredients;
    }
    return JSON.parse(JSON.stringify(DEFAULT_INGREDIENTS));
  });

  const [selectedIngredientIds, setSelectedIngredientIds] = useState<Set<string>>(() => {
    if (
      initialSavedRation?.selectedIngredientIds &&
      initialSavedRation.selectedIngredientIds.length > 0
    ) {
      return new Set(initialSavedRation.selectedIngredientIds);
    }
    return new Set(DEFAULT_INGREDIENTS.map((i) => i.id));
  });

  // Stored last calculated costs from ration solving (restored from saved ration)
  const [sonRasyonMaliyetiBesi, setSonRasyonMaliyetiBesi] = useState<number | null>(() => {
    if (initialSavedRation?.module === 'besi' && initialSavedRation.result?.gunlukMaliyet) {
      return initialSavedRation.result.gunlukMaliyet;
    }
    return null;
  });

  const [sonRasyonMaliyetiSut, setSonRasyonMaliyetiSut] = useState<number | null>(() => {
    if (initialSavedRation?.module === 'sut' && initialSavedRation.result?.gunlukMaliyet) {
      return initialSavedRation.result.gunlukMaliyet;
    }
    return null;
  });

  // Ration solution results per module (restored from saved ration)
  const [rationResults, setRationResults] = useState<{
    [key in 'besi' | 'sut' | 'koyun' | 'keci']?: RationResult;
  }>(() => {
    if (initialSavedRation?.module && initialSavedRation?.result) {
      return { [initialSavedRation.module]: initialSavedRation.result };
    }
    return {};
  });

  const [rationErrors, setRationErrors] = useState<{
    [key in 'besi' | 'sut' | 'koyun' | 'keci']?: string;
  }>({});

  // IOFC logbook records
  const [iofcRecords, setIofcRecords] = useState<IofcRecord[]>([]);

  // Toggle ingredient selection
  const handleToggleSelect = (id: string) => {
    setSelectedIngredientIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size <= 2) {
          showToast('En az 2 hammadde seçili olmalıdır.');
          return prev;
        }
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedIngredientIds(new Set(ingredients.map((i) => i.id)));
    showToast('Tüm hammaddeler rasyona dahil edildi.');
  };

  const handleClearAll = () => {
    setSelectedIngredientIds(new Set([ingredients[0]?.id || 'misirSilaj']));
    showToast('Seçimler sıfırlandı.');
  };

  const handleResetDefaults = () => {
    setIngredients(JSON.parse(JSON.stringify(DEFAULT_INGREDIENTS)));
    setSelectedIngredientIds(new Set(DEFAULT_INGREDIENTS.map((i) => i.id)));
    showToast('Varsayılan hammadde değerleri ve sınırları yüklendi.');
  };

  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [editingIngredientId, setEditingIngredientId] = useState<string | null>(null);
  const [modalIngredient, setModalIngredient] = useState<Partial<FeedIngredient>>({
    ad: '',
    fiyat: 0,
    dm: 0.88,
    nem: 1.5,
    neg: 1.0,
    nel: 1.4,
    hp: 10,
    ca: 0.5,
    p: 0.3,
    ndf: 40,
    min: 0,
    max: 100,
    kaba: false,
  });

  const handleOpenAddModal = () => {
    setEditingIngredientId(null);
    setModalIngredient({
      ad: '',
      fiyat: 0,
      dm: 0.88,
      nem: 1.5,
      neg: 1.0,
      nel: 1.4,
      hp: 10,
      ca: 0.5,
      p: 0.3,
      ndf: 40,
      min: 0,
      max: 100,
      kaba: false,
    });
    setIsIngredientModalOpen(true);
  };

  const handleOpenEditModal = (ingredient: FeedIngredient) => {
    setEditingIngredientId(ingredient.id);
    setModalIngredient({ ...ingredient });
    setIsIngredientModalOpen(true);
  };

  const handleSaveIngredient = () => {
    if (!modalIngredient.ad?.trim()) {
      showToast('Lütfen hammadde adı giriniz.');
      return;
    }
    const id = editingIngredientId || (modalIngredient.ad.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now());
    const completeIngredient: FeedIngredient = {
      id,
      ad: modalIngredient.ad.trim(),
      fiyat: modalIngredient.fiyat || 0,
      dm: modalIngredient.dm || 0,
      nem: modalIngredient.nem || 0,
      neg: modalIngredient.neg || 0,
      nel: modalIngredient.nel || 0,
      hp: modalIngredient.hp || 0,
      ca: modalIngredient.ca || 0,
      p: modalIngredient.p || 0,
      ndf: modalIngredient.ndf || 0,
      min: modalIngredient.min || 0,
      max: modalIngredient.max || 100,
      kaba: modalIngredient.kaba || false,
    };

    if (editingIngredientId) {
      setIngredients(prev => prev.map(i => i.id === editingIngredientId ? completeIngredient : i));
      showToast(`${completeIngredient.ad} güncellendi.`);
    } else {
      setIngredients(prev => [...prev, completeIngredient]);
      setSelectedIngredientIds(prev => new Set([...prev, id]));
      showToast(`${completeIngredient.ad} listeye eklendi.`);
    }
    
    setIsIngredientModalOpen(false);
  };

  const handleUpdateIngredient = (
    id: string,
    field: 'fiyat' | 'min' | 'max',
    val: number
  ) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  // Solve Ration
  const handleSolveRation = () => {
    const selectedList = ingredients.filter((i) => selectedIngredientIds.has(i.id));

    if (selectedList.length < 2) {
      showToast('Optimizasyon için en az 2 hammadde seçmelisiniz.');
      return;
    }

    let res: RationResult;
    if (currentModule === 'besi') {
      res = hesaplaRasyonBesi(besiInputs, selectedList);
      if (res.basarili) {
        setSonRasyonMaliyetiBesi(res.gunlukMaliyet);
      }
    } else if (currentModule === 'sut') {
      res = hesaplaRasyonSut(sutInputs, selectedList);
      if (res.basarili) {
        setSonRasyonMaliyetiSut(res.gunlukMaliyet);
      }
    } else if (currentModule === 'koyun') {
      res = hesaplaRasyonKoyun(koyunInputs, selectedList);
    } else if (currentModule === 'keci') {
      res = hesaplaRasyonKeci(keciInputs, selectedList);
    } else {
      return;
    }

    if (res.basarili) {
      const now = new Date();
      const formattedTime = now.toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const payload: SavedLastRationState = {
        module: currentModule as 'besi' | 'sut' | 'koyun' | 'keci',
        savedAt: now.toISOString(),
        savedAtFormatted: formattedTime,
        inputs: {
          besi: besiInputs,
          sut: sutInputs,
          koyun: koyunInputs,
          keci: keciInputs,
        },
        ingredients,
        selectedIngredientIds: Array.from(selectedIngredientIds),
        result: res,
      };

      saveLastRation(payload);
      setRationHistory(loadRationHistory()); // Refresh history
      setLastSavedInfo(formattedTime);

      setRationResults((prev) => ({ ...prev, [currentModule]: res }));
      setRationErrors((prev) => ({ ...prev, [currentModule]: undefined }));
      showToast('Optimum rasyon hesaplandı ve yerel depoya kaydedildi!');
    } else {
      setRationErrors((prev) => ({
        ...prev,
        [currentModule]: res.hataMesaji || 'Çözüm bulunamadı.',
      }));
      setRationResults((prev) => ({ ...prev, [currentModule]: undefined }));
      showToast(res.hataMesaji || 'Kısıtlar altında geçerli bir çözüm bulunamadı.');
    }
  };

  const handleClearSavedRation = () => {
    clearLastRation();
    setRationHistory([]);
    setLastSavedInfo(null);
    showToast('Kayıtlı rasyon geçmişi yerel depodan silindi.');
  };

  const handleRestoreHistory = (h: SavedLastRationState) => {
    setCurrentModule(h.module);
    if (h.inputs?.besi) setBesiInputs(h.inputs.besi);
    if (h.inputs?.sut) setSutInputs(h.inputs.sut);
    if (h.inputs?.koyun) setKoyunInputs(h.inputs.koyun);
    if (h.inputs?.keci) setKeciInputs(h.inputs.keci);
    
    setIngredients(h.ingredients);
    setSelectedIngredientIds(new Set(h.selectedIngredientIds));
    setRationResults((prev) => ({ ...prev, [h.module]: h.result }));
    setRationErrors((prev) => ({ ...prev, [h.module]: undefined }));
    setLastSavedInfo(h.savedAtFormatted);
    showToast(`${h.savedAtFormatted} tarihli rasyon başarıyla yüklendi.`);
  };

  const isRationModule =
    currentModule === 'besi' ||
    currentModule === 'sut' ||
    currentModule === 'koyun' ||
    currentModule === 'keci';

  const currentRationResult = isRationModule
    ? rationResults[currentModule as 'besi' | 'sut' | 'koyun' | 'keci']
    : undefined;

  const currentRationError = isRationModule
    ? rationErrors[currentModule as 'besi' | 'sut' | 'koyun' | 'keci']
    : undefined;

  const moduleConfig = MODULES[currentModule];

  return (
    <GlossaryProvider>
      <div className="min-h-screen bg-[#F6F4EC] text-[#20261A] font-sans flex flex-col selection:bg-[#E2DDCB]">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#20261A] text-white px-5 py-3 rounded-xl shadow-xl text-xs font-mono-code flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-[#C19B4C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* App Header */}
      <Header
        lang={lang}
        setLang={setLang}
        currentModule={currentModule}
        onSelectModule={setCurrentModule}
        onBackToWebsite={onBackToWebsite}
        onLogout={onLogout}
        adminUsername={adminUsername}
        lastSavedInfo={lastSavedInfo}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Module Hero Banner */}
        <Hero
            lang={lang}
          currentModule={currentModule}
          onSelectModule={setCurrentModule}
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        {/* Ration History Bar */}
        {rationHistory.length > 0 && (
          <div className="bg-white border border-[#DCD7C4] rounded-xl p-4 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#F2EFE2] text-[#2E5B39] flex items-center justify-center shrink-0 border border-[#DCD7C4]/60">
              <History className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-sm text-[#20261A] mb-2">Son Hesaplanan Rasyonlar</h3>
              <div className="flex flex-wrap gap-2">
                {rationHistory.map((h, i) => {
                  const isCurrent = h.savedAtFormatted === lastSavedInfo;
                  const modName = MODULES[h.module]?.title || h.module;
                  return (
                    <button
                      key={h.id || i}
                      onClick={() => handleRestoreHistory(h)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        isCurrent 
                        ? 'bg-[#2E5B39] text-white border-[#2E5B39] shadow-sm cursor-default' 
                        : 'bg-[#FCFBF6] text-[#6B7160] border-[#E2DDCB] hover:bg-[#F2EFE2] hover:text-[#20261A] cursor-pointer'
                      }`}
                    >
                      {isCurrent && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{modName}</span>
                      <span className="opacity-70 font-normal">|</span>
                      <span>{h.savedAtFormatted.split(' ')[1]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 01: Input Parameters */}
        <section id="step-inputs" className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#20261A] text-white font-mono-code text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="font-heading font-bold text-lg text-[#20261A]">
                {isRationModule
                  ? 'Hayvan Parametreleri & Besin Maddesi İhtiyaçları'
                  : 'Hesaplama & Giriş Parametreleri'}
              </h2>
            </div>
            {isRationModule && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#2E5B39] bg-[#EAF2E8] border border-[#B9C8B0] px-3 py-1 rounded-full font-medium">
                <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                NDF, Rumen, KM, NEL gibi teknik terimlerin üzerine gelerek çiftçi dilinde açıklamalarını görebilirsiniz
              </span>
            )}
          </div>

          {currentModule === 'besi' && (
            <BesiPanel inputs={besiInputs} onChange={setBesiInputs} />
          )}
          {currentModule === 'sut' && (
            <SutPanel inputs={sutInputs} onChange={setSutInputs} />
          )}
          {currentModule === 'koyun' && (
            <KoyunPanel
              inputs={koyunInputs}
              onChange={setKoyunInputs}
              onToast={showToast}
            />
          )}
          {currentModule === 'keci' && (
            <KeciPanel
              inputs={keciInputs}
              onChange={setKeciInputs}
              onToast={showToast}
            />
          )}
          {currentModule === 'sutEko' && (
            <SutEkoPanel
              inputs={sutEkoInputs}
              onChange={setSutEkoInputs}
              sonRasyonMaliyetiSut={sonRasyonMaliyetiSut}
              onToast={showToast}
            />
          )}
          {currentModule === 'besiEko' && (
            <BesiEkoPanel
              inputs={besiEkoInputs}
              onChange={setBesiEkoInputs}
              sonRasyonMaliyetiBesi={sonRasyonMaliyetiBesi}
              onToast={showToast}
            />
          )}
          {currentModule === 'gebTakvim' && (
            <GebTakvimPanel
              inputs={gebTakvimInputs}
              onChange={setGebTakvimInputs}
            />
          )}
          {currentModule === 'kizTakvim' && (
            <KizTakvimPanel
              inputs={kizTakvimInputs}
              onChange={setKizTakvimInputs}
            />
          )}
          {currentModule === 'iofc' && (
            <IofcPanel
              inputs={iofcInputs}
              onChange={setIofcInputs}
              sonRasyonMaliyetiSut={sonRasyonMaliyetiSut}
              iofcRecords={iofcRecords}
              onAddRecord={(rec) =>
                setIofcRecords((prev) => [{ ...rec, id: String(Date.now()) }, ...prev])
              }
              onClearRecords={() => {
                setIofcRecords([]);
                showToast('SYGM defteri temizlendi.');
              }}
              onToast={showToast}
            />
          )}
          {currentModule === 'damizlik' && (
            <DamizlikPanel
              inputs={damizlikInputs}
              onChange={setDamizlikInputs}
            />
          )}
        </section>

        {/* STEP 02: Feed Ingredients Table (for Ration Modules) */}
        {isRationModule && (
          <section id="step-ingredients" className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#20261A] text-white font-mono-code text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-heading font-bold text-lg text-[#20261A]">
                  Yem Hammaddeleri, Fiyatlar ve Katkı Sınırları
                </h2>
              </div>
              <span className="font-mono-code text-xs text-[#6B7160]">
                Doğrudan tablo üzerinden fiyat ve min/maks sınırlarını düzenleyebilirsiniz
              </span>
            </div>

            <IngredientsTable
              ingredients={ingredients}
              selectedIds={selectedIngredientIds}
              currentModule={currentModule}
              subType={
                currentModule === 'koyun'
                  ? koyunInputs.tip
                  : currentModule === 'keci'
                  ? keciInputs.tip
                  : undefined
              }
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
              onClearAll={handleClearAll}
              onResetDefaults={handleResetDefaults}
              onUpdateIngredient={handleUpdateIngredient}
              onAddIngredient={handleOpenAddModal}
              onEditIngredient={handleOpenEditModal}
            />

            {/* Solver Action Trigger Bar */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-[#DCD7C4] bg-white hover:bg-[#F2EFE2] rounded-xl text-xs font-semibold text-[#6B7160] hover:text-[#20261A] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Fiyatları Sıfırla
              </button>
              <button
                type="button"
                onClick={handleSolveRation}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2E5B39] hover:bg-[#254A2E] text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Optimum Rasyonu Hesapla</span>
              </button>
            </div>
          </section>
        )}

        {/* STEP 03 / OUTPUT: Results & Reports */}
        <section id="step-results" className="space-y-4 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#20261A] text-white font-mono-code text-xs font-bold flex items-center justify-center">
              {isRationModule ? '3' : '2'}
            </span>
            <h2 className="font-heading font-bold text-lg text-[#20261A]">
              {isRationModule
                ? 'Rasyon Çözümü ve Besin Maddesi Dengesi'
                : 'Hesaplama Sonuçları ve Zooteknik Rapor'}
            </h2>
          </div>

          {/* If Ration Module */}
          {isRationModule && (
            <>
              {currentRationError && (
                <div className="bg-[#FDF3F2] border border-[#E5CFC5] rounded-xl p-6 flex items-start gap-4 shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-[#8A3B2E] text-white flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#8A3B2E]">
                      Matematiksel Çözüm Bulunamadı
                    </h3>
                    <p className="text-xs text-[#5C3B34] mt-1 leading-relaxed">
                      {currentRationError}
                    </p>
                    <p className="text-xs text-[#6B7160] mt-2">
                      Öneri: Seçili hammadde sayısını artırın (örn. Arpa, Mısır Silajı, Soya Küspesi), kaba yem alt sınırını esnetin veya min/maks hammadde kısıtlarını gevşetin.
                    </p>
                  </div>
                </div>
              )}

              {currentRationResult && (
                <RationResultView
                  result={currentRationResult}
                  moduleName={moduleConfig.title}
                  lastSavedAt={lastSavedInfo}
                  onClearSaved={handleClearSavedRation}
                  onToast={showToast}
                />
              )}

              {!currentRationResult && !currentRationError && (
                <div className="bg-[#FCFBF6] border border-dashed border-[#DCD7C4] rounded-xl p-10 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF2E8] border border-[#B9C8B0] flex items-center justify-center mx-auto mb-3 text-[#2E5B39]">
                    <Play className="w-6 h-6 fill-[#2E5B39]" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#20261A] mb-1">
                    Rasyon Hesaplanmaya Hazır
                  </h3>
                  <p className="text-xs text-[#6B7160] max-w-md mx-auto mb-4">
                    Yukarıdaki hayvan parametrelerini ve yem fiyatlarını belirledikten sonra <strong>“Optimum Rasyonu Hesapla”</strong> düğmesine basarak en düşük maliyetli doğrusal programlama çözümünü elde edebilirsiniz.
                  </p>
                  <button
                    type="button"
                    onClick={handleSolveRation}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2E5B39] text-white rounded-lg text-xs font-semibold hover:bg-[#254A2E] transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Optimum Rasyonu Şimdi Hesapla
                  </button>
                </div>
              )}
            </>
          )}

          {/* If Non-Ration Modules */}
          {currentModule === 'sutEko' && (
            <SutEkoResultView inputs={sutEkoInputs} onToast={showToast} />
          )}
          {currentModule === 'besiEko' && (
            <BesiEkoResultView inputs={besiEkoInputs} onToast={showToast} />
          )}
          {currentModule === 'gebTakvim' && (
            <GebTakvimResultView inputs={gebTakvimInputs} onToast={showToast} />
          )}
          {currentModule === 'kizTakvim' && (
            <KizTakvimResultView inputs={kizTakvimInputs} onToast={showToast} />
          )}
          {currentModule === 'iofc' && (
            <IofcResultView
              inputs={iofcInputs}
              records={iofcRecords}
              onDeleteRecord={(id) => {
                setIofcRecords((prev) => prev.filter((r) => r.id !== id));
                showToast('Kayıt silindi.');
              }}
              onToast={showToast}
            />
          )}
          {currentModule === 'damizlik' && (
            <DamizlikResultView inputs={damizlikInputs} onToast={showToast} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DCD7C4] bg-[#F6F4EC] mt-16 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-[#6B7160]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-[#20261A]">Ada Çiftliği</span>
            <span>—</span>
            <span>Zooteknik Karar Destek Platformu</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-[#20261A] underline transition-colors cursor-pointer"
            >
              Bilimsel Metodoloji & Standartlar
            </button>
            <span>·</span>
            <span>NRC 2001/2007/2016 & INRA UFL/UFV Normları</span>
          </div>
        </div>
      </footer>

      {/* Guide & FAQ Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Add/Edit Ingredient Modal */}
      {isIngredientModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#20261A]/80 backdrop-blur-sm p-4">
          <div className="bg-[#FAF8F0] w-full max-w-2xl rounded-2xl shadow-xl border border-[#DCD7C4] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-white border-b border-[#DCD7C4] flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-lg font-bold text-[#20261A] font-heading">{editingIngredientId ? 'Hammadde Düzenle' : 'Yeni Hammadde Ekle'}</h3>
              <button
                type="button"
                onClick={() => setIsIngredientModalOpen(false)}
                className="text-[#6B7160] hover:text-[#20261A] transition-colors p-1"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">
                    Hammadde Adı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={modalIngredient.ad}
                    onChange={(e) => setModalIngredient(p => ({ ...p, ad: e.target.value }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                    placeholder="Örn: Yonca Kuru Otu"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">Fiyat (₺/kg)</label>
                  <input
                    type="number" min="0" step="0.1"
                    value={modalIngredient.fiyat}
                    onChange={(e) => setModalIngredient(p => ({ ...p, fiyat: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                  />
                </div>

                <div className="flex items-center mt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modalIngredient.kaba}
                      onChange={(e) => setModalIngredient(p => ({ ...p, kaba: e.target.checked }))}
                      className="w-4 h-4 accent-[#2E5B39]"
                    />
                    <span className="text-sm font-semibold text-[#20261A]">Kaba Yem mi?</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">Kuru Madde (KM) Oranı</label>
                  <input
                    type="number" min="0" max="1" step="0.01"
                    value={modalIngredient.dm}
                    onChange={(e) => setModalIngredient(p => ({ ...p, dm: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                    title="0 ile 1 arasında giriniz (Örn: %88 için 0.88)"
                  />
                  <p className="text-[10px] text-[#6B7160] mt-1">0 ile 1 arası (Örn: %88 için 0.88)</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">Ham Protein (HP) %</label>
                  <input
                    type="number" min="0" step="0.1"
                    value={modalIngredient.hp}
                    onChange={(e) => setModalIngredient(p => ({ ...p, hp: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">NEm (Mcal/kg KM)</label>
                  <input
                    type="number" min="0" step="0.01"
                    value={modalIngredient.nem}
                    onChange={(e) => setModalIngredient(p => ({ ...p, nem: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">NEg (Mcal/kg KM)</label>
                  <input
                    type="number" min="0" step="0.01"
                    value={modalIngredient.neg}
                    onChange={(e) => setModalIngredient(p => ({ ...p, neg: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">NEL (Mcal/kg KM)</label>
                  <input
                    type="number" min="0" step="0.01"
                    value={modalIngredient.nel}
                    onChange={(e) => setModalIngredient(p => ({ ...p, nel: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">NDF (NDF) %</label>
                  <input
                    type="number" min="0" step="0.1"
                    value={modalIngredient.ndf}
                    onChange={(e) => setModalIngredient(p => ({ ...p, ndf: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">Kalsiyum (Ca) %</label>
                  <input
                    type="number" min="0" step="0.01"
                    value={modalIngredient.ca}
                    onChange={(e) => setModalIngredient(p => ({ ...p, ca: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#20261A] mb-1">Fosfor (P) %</label>
                  <input
                    type="number" min="0" step="0.01"
                    value={modalIngredient.p}
                    onChange={(e) => setModalIngredient(p => ({ ...p, p: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-[#DCD7C4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2E5B39]"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t border-[#DCD7C4] flex items-center justify-end gap-3 sticky bottom-0">
              <button
                type="button"
                onClick={() => setIsIngredientModalOpen(false)}
                className="px-4 py-2 border border-[#DCD7C4] rounded-lg text-sm font-semibold text-[#6B7160] hover:bg-[#F2EFE2] hover:text-[#20261A] transition-colors"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleSaveIngredient}
                className="px-4 py-2 bg-[#2E5B39] text-white rounded-lg text-sm font-semibold hover:bg-[#254A2E] shadow-sm transition-all"
              >
                {editingIngredientId ? 'Güncelle' : 'Ekle ve Seç'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </GlossaryProvider>
  );
}
