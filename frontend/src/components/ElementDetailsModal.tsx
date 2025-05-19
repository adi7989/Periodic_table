import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Element } from "@/data/periodicTableData";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ElementDetailsModalProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
}

const ElementDetailsModal = ({ element, isOpen, onClose }: ElementDetailsModalProps) => {
  if (!element) return null;

  const formatProperty = (value: any, unit?: string) => {
    if (value === null || value === undefined) return "Unknown";
    return `${value}${unit ? ` ${unit}` : ""}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span className="text-4xl font-bold">{element.symbol}</span>
            <span>{element.name}</span>
            <span className="text-sm text-gray-500">({element.atomicNumber})</span>
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Category</p>
                        <p className="text-lg">{element.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Atomic Mass</p>
                        <p className="text-lg">{element.atomicMass} u</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Group</p>
                        <p className="text-lg">{element.group}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Period</p>
                        <p className="text-lg">{element.period}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Block</p>
                        <p className="text-lg">{element.block}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Electron Configuration</p>
                        <p className="text-lg">{element.electronConfiguration}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium mb-2">Description</p>
                    <p>{element.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="properties" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Electronegativity</p>
                        <p className="text-lg">{formatProperty(element.electronegativity, "Pauling")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Atomic Radius</p>
                        <p className="text-lg">{formatProperty(element.atomicRadius, "pm")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ionization Energy</p>
                        <p className="text-lg">{formatProperty(element.ionizationEnergy, "eV")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Density</p>
                        <p className="text-lg">{formatProperty(element.density, "g/cm³")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Melting Point</p>
                        <p className="text-lg">{formatProperty(element.meltingPoint, "°C")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Boiling Point</p>
                        <p className="text-lg">{formatProperty(element.boilingPoint, "°C")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium">Discovered By</p>
                    <p className="text-lg mb-4">{element.discoveredBy || "Unknown"}</p>
                    
                    <Separator className="my-4" />
                    
                    <p className="text-sm font-medium">Fun Facts</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      {element.name === "Hydrogen" && (
                        <>
                          <li>Hydrogen is the most abundant element in the universe.</li>
                          <li>It's the primary fuel for nuclear fusion in stars.</li>
                        </>
                      )}
                      {element.name === "Helium" && (
                        <>
                          <li>Helium was discovered on the sun before it was found on Earth.</li>
                          <li>It's the only element that cannot be solidified by cooling at normal atmospheric pressure.</li>
                        </>
                      )}
                      {element.name === "Carbon" && (
                        <>
                          <li>Carbon forms more compounds than any other element.</li>
                          <li>It's the basis for all known life forms on Earth.</li>
                        </>
                      )}
                      {element.name === "Gold" && (
                        <>
                          <li>All the gold ever mined would fit into a cube with sides of 21 meters.</li>
                          <li>Gold is so malleable that it can be beaten into sheets thin enough for light to pass through.</li>
                        </>
                      )}
                      {!["Hydrogen", "Helium", "Carbon", "Gold"].includes(element.name) && (
                        <li>This element has unique properties that make it valuable for scientific research and industrial applications.</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ElementDetailsModal;