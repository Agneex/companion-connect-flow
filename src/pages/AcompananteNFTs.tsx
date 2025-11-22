import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Award, 
  Calendar, 
  User, 
  MapPin, 
  Clock,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Download,
  Share2,
  Heart,
  Activity,
  Users,
  Navigation,
  Filter
} from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Provider";
import { cn } from "@/lib/utils";

// Import NFT Art
import nftSocial from "@/assets/nft-social.png";
import nftHealth from "@/assets/nft-health.png";
import nftMobility from "@/assets/nft-mobility.png";
import nftEmotional from "@/assets/nft-emotional.png";

interface NFTMetadata {
  id: string;
  tokenId: number;
  name: string;
  description: string;
  image: string;
  sessionDate: Date;
  silverName: string;
  activity: string;
  location: string;
  duration: number;
  category: "social" | "health" | "mobility" | "emotional";
  impact: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

const impactCategories = {
  social: {
    name: "Conexión Social",
    color: "from-orange-400 to-purple-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    textColor: "text-orange-600",
    icon: Users,
    image: nftSocial,
  },
  health: {
    name: "Apoyo en Salud",
    color: "from-teal-400 to-green-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
    textColor: "text-teal-600",
    icon: Activity,
    image: nftHealth,
  },
  mobility: {
    name: "Movilidad",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    textColor: "text-cyan-600",
    icon: Navigation,
    image: nftMobility,
  },
  emotional: {
    name: "Apoyo Emocional",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    textColor: "text-pink-600",
    icon: Heart,
    image: nftEmotional,
  }
};

const AcompananteNFTs = () => {
  const { isConnected, isCompanion, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFTMetadata | null>(null);
  const [filter, setFilter] = useState<"all" | "social" | "health" | "mobility" | "emotional">("all");

  const handleLogout = () => {
    disconnectWallet();
    navigate("/");
  };

  useEffect(() => {
    if (!isConnected || !isCompanion) {
      navigate("/acompanante/login");
      return;
    }

    // Generate demo NFTs
    const demoNFTs: NFTMetadata[] = [
      {
        id: "1",
        tokenId: 1001,
        name: "Conversación y Escucha Activa",
        description: "Sesión dedicada a reducir la soledad mediante conversación significativa y compañía.",
        image: impactCategories.social.image,
        sessionDate: new Date("2024-01-15"),
        silverName: "María González",
        activity: "Conversación y escucha activa",
        location: "Bogotá, Colombia",
        duration: 2,
        category: "social",
        impact: "Reducción de sentimiento de soledad y mejora del bienestar emocional",
        attributes: [
          { trait_type: "Categoría", value: "Conexión Social" },
          { trait_type: "Actividad", value: "Conversación y escucha activa" },
          { trait_type: "Duración", value: "2 horas" },
          { trait_type: "Impacto", value: "Bienestar emocional" },
        ],
      },
      {
        id: "2",
        tokenId: 1002,
        name: "Acompañamiento a Cita Médica",
        description: "Apoyo práctico en consulta médica, ayudando con transporte y comprensión de indicaciones.",
        image: impactCategories.health.image,
        sessionDate: new Date("2024-01-18"),
        silverName: "Carlos Ramírez",
        activity: "Acompañamiento a cita médica",
        location: "Hospital San José, Bogotá",
        duration: 3,
        category: "health",
        impact: "Acceso efectivo a servicios de salud y seguimiento médico adecuado",
        attributes: [
          { trait_type: "Categoría", value: "Apoyo en Salud" },
          { trait_type: "Actividad", value: "Acompañamiento a cita médica" },
          { trait_type: "Duración", value: "3 horas" },
          { trait_type: "Impacto", value: "Acceso a salud" },
        ],
      },
      {
        id: "3",
        tokenId: 1003,
        name: "Compras en Supermercado",
        description: "Ayuda práctica con compras semanales, asegurando nutrición adecuada y autonomía.",
        image: impactCategories.mobility.image,
        sessionDate: new Date("2024-01-20"),
        silverName: "Ana López",
        activity: "Compras en supermercado",
        location: "Éxito Calle 80, Bogotá",
        duration: 2,
        category: "mobility",
        impact: "Autonomía en necesidades básicas y nutrición adecuada",
        attributes: [
          { trait_type: "Categoría", value: "Movilidad" },
          { trait_type: "Actividad", value: "Compras en supermercado" },
          { trait_type: "Duración", value: "2 horas" },
          { trait_type: "Impacto", value: "Autonomía" },
        ],
      },
      {
        id: "5",
        tokenId: 1005,
        name: "Apoyo Emocional en Duelo",
        description: "Compañía empática durante proceso de duelo, ofreciendo escucha activa y contención emocional.",
        image: impactCategories.emotional.image,
        sessionDate: new Date("2024-01-25"),
        silverName: "Patricia Jiménez",
        activity: "Apoyo emocional",
        location: "Domicilio, Bogotá",
        duration: 2.5,
        category: "emotional",
        impact: "Procesamiento saludable de emociones y reducción de aislamiento",
        attributes: [
          { trait_type: "Categoría", value: "Apoyo Emocional" },
          { trait_type: "Actividad", value: "Apoyo emocional en duelo" },
          { trait_type: "Duración", value: "2.5 horas" },
          { trait_type: "Impacto", value: "Salud emocional" },
        ],
      },
      {
        id: "6",
        tokenId: 1006,
        name: "Paseo por el Parque",
        description: "Acompañamiento recreativo para actividad física y disfrute del aire libre.",
        image: impactCategories.social.image,
        sessionDate: new Date("2024-01-28"),
        silverName: "Luis Martínez",
        activity: "Paseo por el parque",
        location: "Parque Simón Bolívar, Bogotá",
        duration: 1.5,
        category: "social",
        impact: "Actividad física y bienestar mental",
        attributes: [
          { trait_type: "Categoría", value: "Conexión Social" },
          { trait_type: "Actividad", value: "Paseo por el parque" },
          { trait_type: "Duración", value: "1.5 horas" },
          { trait_type: "Impacto", value: "Actividad física" },
        ],
      },
      {
        id: "7",
        tokenId: 1007,
        name: "Gestión de Medicamentos",
        description: "Organización de medicamentos y recordatorios para tomas correctas.",
        image: impactCategories.health.image,
        sessionDate: new Date("2024-01-30"),
        silverName: "Elena Ruiz",
        activity: "Gestión de medicamentos",
        location: "Domicilio, Bogotá",
        duration: 1,
        category: "health",
        impact: "Adherencia al tratamiento y prevención de complicaciones",
        attributes: [
          { trait_type: "Categoría", value: "Apoyo en Salud" },
          { trait_type: "Actividad", value: "Gestión de medicamentos" },
          { trait_type: "Duración", value: "1 hora" },
          { trait_type: "Impacto", value: "Salud preventiva" },
        ],
      },
      {
        id: "8",
        tokenId: 1008,
        name: "Transporte a Terapia",
        description: "Acompañamiento seguro en transporte público para asistir a sesiones de fisioterapia.",
        image: impactCategories.mobility.image,
        sessionDate: new Date("2024-02-02"),
        silverName: "Jorge Mendoza",
        activity: "Transporte a terapia",
        location: "Centro de Rehabilitación, Bogotá",
        duration: 2,
        category: "mobility",
        impact: "Continuidad en tratamiento de rehabilitación",
        attributes: [
          { trait_type: "Categoría", value: "Movilidad" },
          { trait_type: "Actividad", value: "Transporte a terapia" },
          { trait_type: "Duración", value: "2 horas" },
          { trait_type: "Impacto", value: "Acceso a tratamiento" },
        ],
      },
    ];

    setNfts(demoNFTs);
  }, [isConnected, isCompanion, navigate]);

  const filteredNFTs = filter === "all" 
    ? nfts 
    : nfts.filter(nft => nft.category === filter);

  const stats = {
    total: nfts.length,
    social: nfts.filter(n => n.category === "social").length,
    health: nfts.filter(n => n.category === "health").length,
    mobility: nfts.filter(n => n.category === "mobility").length,
    emotional: nfts.filter(n => n.category === "emotional").length,
  };

  const getCategoryBadge = (category: NFTMetadata["category"]) => {
    const cat = impactCategories[category];
    return (
      <Badge className={cn(cat.bgColor, cat.borderColor, cat.textColor, "hover:opacity-80")}>
        {cat.name}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav onLogout={handleLogout} />
      
      <main className="pt-[120px]">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-glow-primary">
                  <Award className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">Mi Colección de NFTs</h1>
                  <p className="text-muted-foreground text-sm">
                    {stats.total} arte{stats.total !== 1 ? 's' : ''} digital{stats.total !== 1 ? 'es' : ''} que represent{stats.total !== 1 ? 'an' : 'a'} el impacto de tu trabajo
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Todo
                </Button>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <Card className="hover-scale border-primary/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </CardContent>
              </Card>

              {Object.entries(impactCategories).map(([key, cat]) => {
                const Icon = cat.icon;
                const count = stats[key as keyof typeof stats];
                return (
                  <Card key={key} className="hover-scale">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", cat.bgColor)}>
                        <Icon className={cn("w-5 h-5", cat.textColor)} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{count}</p>
                        <p className="text-xs text-muted-foreground truncate">{cat.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filtrar por categoría:</span>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                Todos ({stats.total})
              </Button>
              {Object.entries(impactCategories).map(([key, cat]) => {
                const Icon = cat.icon;
                const count = stats[key as keyof typeof stats];
                return (
                  <Button
                    key={key}
                    variant={filter === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(key as typeof filter)}
                    className={filter === key ? cn(cat.bgColor, cat.textColor, "border-0") : ""}
                  >
                    <Icon className="w-4 h-4 mr-1.5" />
                    {cat.name} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* NFT Grid */}
          {filteredNFTs.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center">
                <Award className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-30" />
                <h3 className="text-lg font-semibold mb-2">No hay NFTs en esta categoría</h3>
                <p className="text-sm text-muted-foreground">
                  Completa sesiones de {filter === "all" ? "cualquier tipo" : impactCategories[filter as keyof typeof impactCategories].name.toLowerCase()} para ganar NFTs
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredNFTs.map((nft, idx) => (
                <Card 
                  key={nft.id}
                  className="group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden border-muted animate-fade-in"
                  style={{ animationDelay: `${idx * 40}ms` }}
                  onClick={() => setSelectedNFT(nft)}
                >
                  {/* NFT Image */}
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted/50 to-background">
                    <img 
                      src={nft.image} 
                      alt={nft.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3">
                      {getCategoryBadge(nft.category)}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        #{nft.tokenId}
                      </Badge>
                    </div>
                  </div>

                  {/* NFT Info */}
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold line-clamp-1 mb-1">{nft.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{nft.description}</p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{format(nft.sessionDate, "d MMM yyyy", { locale: es })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{nft.silverName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{nft.duration}h • {nft.activity}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <Dialog open={!!selectedNFT} onOpenChange={() => setSelectedNFT(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                {selectedNFT.name}
              </DialogTitle>
              <DialogDescription>Token #{selectedNFT.tokenId} • {format(selectedNFT.sessionDate, "d 'de' MMMM, yyyy", { locale: es })}</DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: NFT Image */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-background">
                  <img 
                    src={selectedNFT.image} 
                    alt={selectedNFT.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between">
                  {getCategoryBadge(selectedNFT.category)}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right: NFT Details */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Descripción</h4>
                  <p className="text-sm leading-relaxed">{selectedNFT.description}</p>
                </div>

                {/* Impact */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Impacto Generado</h4>
                      <p className="text-sm text-muted-foreground">{selectedNFT.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Detalles de la Sesión</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Fecha</p>
                        <p className="font-medium">{format(selectedNFT.sessionDate, "d 'de' MMMM, yyyy", { locale: es })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Adulto mayor</p>
                        <p className="font-medium">{selectedNFT.silverName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ubicación</p>
                        <p className="font-medium">{selectedNFT.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duración</p>
                        <p className="font-medium">{selectedNFT.duration} horas</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attributes */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Atributos</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedNFT.attributes.map((attr, idx) => (
                      <div key={idx} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">{attr.trait_type}</p>
                        <p className="text-sm font-semibold">{attr.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default AcompananteNFTs;
