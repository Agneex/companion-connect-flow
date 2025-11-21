import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FileText,
  Navigation
} from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Context";
import { cn } from "@/lib/utils";

// Import NFT Art
import nftSocial from "@/assets/nft-social.png";
import nftHealth from "@/assets/nft-health.png";
import nftMobility from "@/assets/nft-mobility.png";
import nftAdmin from "@/assets/nft-admin.png";
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
  category: "social" | "health" | "mobility" | "admin" | "emotional";
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
    examples: [
      "Conversación y escucha activa",
      "Paseo por el parque",
      "Juegos de mesa",
      "Actividades recreativas",
      "Compañía para eventos"
    ]
  },
  health: {
    name: "Apoyo en Salud",
    color: "from-teal-400 to-green-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
    textColor: "text-teal-600",
    icon: Activity,
    image: nftHealth,
    examples: [
      "Acompañamiento a cita médica",
      "Gestión de medicamentos",
      "Acompañamiento a terapias",
      "Control de signos vitales",
      "Nutrición y alimentación"
    ]
  },
  mobility: {
    name: "Movilidad",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    textColor: "text-cyan-600",
    icon: Navigation,
    image: nftMobility,
    examples: [
      "Transporte a citas",
      "Compras en supermercado",
      "Paseos seguros",
      "Acompañamiento en transporte público",
      "Ejercicio y caminatas"
    ]
  },
  admin: {
    name: "Gestión Administrativa",
    color: "from-indigo-400 to-purple-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    textColor: "text-indigo-600",
    icon: FileText,
    image: nftAdmin,
    examples: [
      "Trámites bancarios",
      "Gestión de documentos",
      "Pago de servicios",
      "Citas y agendamiento",
      "Organización personal"
    ]
  },
  emotional: {
    name: "Apoyo Emocional",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    textColor: "text-pink-600",
    icon: Heart,
    image: nftEmotional,
    examples: [
      "Escucha empática",
      "Apoyo en duelo",
      "Reducción de ansiedad",
      "Motivación y ánimo",
      "Conexión emocional"
    ]
  }
};

const AcompananteNFTs = () => {
  const { isConnected, isCompanion, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFTMetadata | null>(null);
  const [filter, setFilter] = useState<"all" | "social" | "health" | "mobility" | "admin" | "emotional">("all");

  const handleLogout = () => {
    disconnectWallet();
    navigate("/");
  };

  useEffect(() => {
    if (!isConnected || !isCompanion) {
      navigate("/acompanante/login");
      return;
    }

    // Generate demo NFTs with real impact examples
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
        id: "4",
        tokenId: 1004,
        name: "Trámite Bancario",
        description: "Acompañamiento en gestiones bancarias, asegurando comprensión y seguridad en operaciones.",
        image: impactCategories.admin.image,
        sessionDate: new Date("2024-01-22"),
        silverName: "Roberto Silva",
        activity: "Trámite bancario",
        location: "Banco de Bogotá, Centro",
        duration: 1.5,
        category: "admin",
        impact: "Autonomía financiera y seguridad en transacciones",
        attributes: [
          { trait_type: "Categoría", value: "Gestión Administrativa" },
          { trait_type: "Actividad", value: "Trámite bancario" },
          { trait_type: "Duración", value: "1.5 horas" },
          { trait_type: "Impacto", value: "Autonomía financiera" },
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
    admin: nfts.filter(n => n.category === "admin").length,
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
      
      <div className="pt-[120px]">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-glow-primary">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Mi Colección de NFTs</h1>
                <p className="text-muted-foreground">
                  Arte digital que representa el impacto de tu trabajo
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="hover-scale">
                <CardContent className="p-4">
                  <Sparkles className="w-6 h-6 text-primary mb-2" />
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total NFTs</p>
                </CardContent>
              </Card>

              {Object.entries(impactCategories).map(([key, cat]) => {
                const Icon = cat.icon;
                return (
                  <Card key={key} className="hover-scale">
                    <CardContent className="p-4">
                      <Icon className={cn("w-6 h-6 mb-2", cat.textColor)} />
                      <p className="text-2xl font-bold">{stats[key as keyof typeof stats]}</p>
                      <p className="text-xs text-muted-foreground">{cat.name}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="all">Todos ({stats.total})</TabsTrigger>
              <TabsTrigger value="social">
                <Users className="w-4 h-4 mr-2" />
                Social ({stats.social})
              </TabsTrigger>
              <TabsTrigger value="health">
                <Activity className="w-4 h-4 mr-2" />
                Salud ({stats.health})
              </TabsTrigger>
              <TabsTrigger value="mobility">
                <Navigation className="w-4 h-4 mr-2" />
                Movilidad ({stats.mobility})
              </TabsTrigger>
              <TabsTrigger value="admin">
                <FileText className="w-4 h-4 mr-2" />
                Admin ({stats.admin})
              </TabsTrigger>
              <TabsTrigger value="emotional">
                <Heart className="w-4 h-4 mr-2" />
                Emocional ({stats.emotional})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="space-y-6">
              {filteredNFTs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No tienes NFTs en esta categoría todavía</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredNFTs.map((nft, idx) => (
                    <Card 
                      key={nft.id}
                      className="group hover:shadow-xl transition-all cursor-pointer overflow-hidden animate-fade-in"
                      style={{ animationDelay: `${idx * 50}ms` }}
                      onClick={() => setSelectedNFT(nft)}
                    >
                      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-background">
                        <img 
                          src={nft.image} 
                          alt={nft.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          {getCategoryBadge(nft.category)}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent p-4">
                          <p className="text-xs text-muted-foreground mb-1">Token #{nft.tokenId}</p>
                          <h3 className="font-semibold text-sm line-clamp-2">{nft.name}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{format(nft.sessionDate, "d MMM yyyy", { locale: es })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span className="truncate">{nft.silverName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{nft.duration}h • {nft.activity}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <Dialog open={!!selectedNFT} onOpenChange={() => setSelectedNFT(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                {selectedNFT.name}
              </DialogTitle>
              <DialogDescription>Token #{selectedNFT.tokenId}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* NFT Image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-muted to-background">
                <img 
                  src={selectedNFT.image} 
                  alt={selectedNFT.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category Badge */}
              <div className="flex items-center justify-between">
                {getCategoryBadge(selectedNFT.category)}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver en Explorer
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Descripción</h4>
                <p className="text-sm text-muted-foreground">{selectedNFT.description}</p>
              </div>

              {/* Session Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Detalles de la Sesión</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Fecha</p>
                        <p>{format(selectedNFT.sessionDate, "d 'de' MMMM, yyyy", { locale: es })}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Adulto mayor</p>
                        <p>{selectedNFT.silverName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Ubicación</p>
                        <p>{selectedNFT.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duración</p>
                        <p>{selectedNFT.duration} horas</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Impacto Generado</h4>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <TrendingUp className="w-8 h-8 text-primary mb-2" />
                    <p className="text-sm">{selectedNFT.impact}</p>
                  </div>
                </div>
              </div>

              {/* Attributes */}
              <div>
                <h4 className="font-semibold mb-3">Atributos del NFT</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedNFT.attributes.map((attr, idx) => (
                    <div key={idx} className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">{attr.trait_type}</p>
                      <p className="text-sm font-semibold">{attr.value}</p>
                    </div>
                  ))}
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
