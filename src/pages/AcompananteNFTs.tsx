import { useState } from "react";
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
  Filter,
  Loader2
} from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Provider";
import { cn } from "@/lib/utils";
import { useCompanionNFTs } from "@/hooks/useCompanionNFTs";
import { useTranslation } from "react-i18next";

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
  transactionHash?: string;
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
    name: "Acompañamiento en Salud",
    color: "from-teal-400 to-green-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
    textColor: "text-teal-600",
    icon: Activity,
    image: nftHealth,
  },
  mobility: {
    name: "Apoyo Digital",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    textColor: "text-cyan-600",
    icon: Navigation,
    image: nftMobility,
  },
  emotional: {
    name: "Gestiones del día a día",
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
  const { t } = useTranslation();
  const { nfts: contractNFTs, loading } = useCompanionNFTs();
  const [selectedNFT, setSelectedNFT] = useState<any | null>(null);
  const [filter, setFilter] = useState<"all" | "social" | "health" | "mobility" | "emotional">("all");

  const handleLogout = () => {
    disconnectWallet();
    navigate("/");
  };

  // Transform contract NFTs to match expected format
  const nfts: NFTMetadata[] = contractNFTs.map(nft => ({
    id: nft.tokenId.toString(),
    tokenId: nft.tokenId,
    name: nft.metadata?.name || `NFT #${nft.tokenId}`,
    description: nft.metadata?.description || '',
    image: nft.metadata?.image ? nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/') : impactCategories[nft.category].image,
    sessionDate: new Date(),
    silverName: nft.metadata?.attributes.find(a => a.trait_type === 'Usuario')?.value?.toString() || 'N/A',
    activity: nft.metadata?.attributes.find(a => a.trait_type === 'Actividad')?.value?.toString() || 'Sesión de acompañamiento',
    location: 'Bogotá, Colombia',
    duration: Number(nft.metadata?.attributes.find(a => a.trait_type === 'tiempo')?.value) || 0,
    category: nft.category,
    impact: 'Servicio de acompañamiento verificado',
    transactionHash: nft.transactionHash,
    attributes: nft.metadata?.attributes.map(a => ({
      trait_type: a.trait_type,
      value: a.value.toString()
    })) || []
  }));

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
                  <h1 className="text-3xl font-bold mb-1">{t("companion.nfts.title")}</h1>
                  <p className="text-muted-foreground text-sm">
                    {t("companion.nfts.subtitle")}
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
                    <p className="text-xs text-muted-foreground">{t("companion.nfts.totalNfts")}</p>
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
                {t("companion.nfts.filterAll")} ({stats.total})
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
          {loading ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold mb-2">{t("companion.nfts.loadingNfts")}</h3>
                <p className="text-sm text-muted-foreground">
                  Conectando con el contrato inteligente
                </p>
              </CardContent>
            </Card>
          ) : filteredNFTs.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center">
                <Award className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-30" />
                <h3 className="text-lg font-semibold mb-2">{t("companion.nfts.noNfts")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("companion.nfts.noNftsDesc")}
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

                {/* Blockchain Verification */}
                {selectedNFT.transactionHash && (
                  <div className="bg-teal-500/5 border border-teal-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <ExternalLink className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold mb-2 text-sm">Verificación Blockchain</h4>
                        <p className="text-xs text-muted-foreground mb-2">Hash de transacción:</p>
                        <a 
                          href={`https://sepolia.arbiscan.io/tx/${selectedNFT.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-teal-600 hover:text-teal-700 hover:underline font-mono break-all block"
                        >
                          {selectedNFT.transactionHash}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

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
