import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  X, 
  CloudUpload, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Loader2,
  Layers
} from "lucide-react";

const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required"),
  caseType: z.string().min(1, "Case type is required"),
  summary: z.string().optional(),
  complainant: z.string().optional(),
  accused: z.string().optional(),
  validity: z.string().optional(),
  allegations: z.string().optional(),
  factsSummary: z.string().optional(),
  dateOfIncident: z.string().optional(),
  representing: z.string().optional(),
  client: z.string().optional(),
  opponent: z.string().optional(),
  areaOfLaw: z.string().optional(),
  timeline: z.string().optional(),
  status: z.string().default("active"),
  userId: z.number().optional(),
});

type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>;

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateWorkspaceModal({ isOpen, onClose }: CreateWorkspaceModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [manualFacts, setManualFacts] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CreateWorkspaceFormData>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      caseType: "Criminal",
      summary: "",
      complainant: "",
      accused: "",
      validity: "Next Format",
      allegations: "",
      factsSummary: "",
      dateOfIncident: "",
      representing: "",
      client: "",
      opponent: "",
      areaOfLaw: "",
      timeline: "",
      status: "active",
    },
  });

  const createWorkspaceMutation = useMutation({
    mutationFn: async (data: CreateWorkspaceFormData) => {
      const response = await apiRequest("POST", "/api/workspaces", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      setCurrentStep(3);
      toast({
        title: "Success",
        description: "Workspace created successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create workspace. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onClose();
    setCurrentStep(1);
    form.reset();
    setUploadedFiles([]);
    setManualFacts("");
  };

  const onSubmit = (data: CreateWorkspaceFormData) => {
    const enrichedData = {
      ...data,
      factsSummary: manualFacts || data.factsSummary,
      name: data.name || "Untitled Workspace",
      client: data.client || "Default Client",
      areaOfLaw: data.areaOfLaw || "General Law",
      timeline: data.timeline || "TBD",
    };
    createWorkspaceMutation.mutate(enrichedData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Case Details</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Upload the case files
                  </p>
                  <Card className="border-2 border-dashed border-gray-300 hover:border-teal-500 transition-colors duration-200">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <CloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Drag and drop your document
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          or click to browse
                        </p>
                        <p className="text-xs text-gray-400">
                          PDF Files (Max 30MB)
                        </p>
                        <input
                          type="file"
                          multiple
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="inline-block mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg cursor-pointer hover:bg-teal-700 transition-colors duration-200"
                        >
                          Choose Files
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {file}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Add some facts manually
                  </label>
                  <Textarea
                    placeholder="Enter case description..."
                    value={manualFacts}
                    onChange={(e) => setManualFacts(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workspace Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter workspace name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="caseType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Case Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select case type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Criminal">Criminal</SelectItem>
                              <SelectItem value="Civil">Civil</SelectItem>
                              <SelectItem value="Corporate">Corporate</SelectItem>
                              <SelectItem value="Family">Family</SelectItem>
                              <SelectItem value="Immigration">Immigration</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="client"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter client name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="complainant"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complainant</FormLabel>
                          <FormControl>
                            <Input placeholder="Marcus Smith Assistant General Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="opponent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Opponent</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter opponent name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accused"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accused</FormLabel>
                          <FormControl>
                            <Input placeholder="Amy Johnson, Big Store" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="areaOfLaw"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Section</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter section/area of law" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="validity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validity</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select validity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Next Format">Next Format</SelectItem>
                              <SelectItem value="Current Format">Current Format</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Case Timeline</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter timeline" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="County headquarters, domestic violence, and statement by outside..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allegations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allegations</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="County headquarters, domestic violence, and statement by outside..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="factsSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facts Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Metro incident forced bargaining from calling fee, with evidence supporting from the jury against direct independent allegations..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfIncident"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Incident</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="representing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Representing (Optional defend)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select representing" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Harris Graham">Harris Graham</SelectItem>
                            <SelectItem value="Amy Johnson, Big Store">Amy Johnson, Big Store</SelectItem>
                            <SelectItem value="Johnson defend">Johnson defend</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Go Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                      disabled={createWorkspaceMutation.isPending}
                    >
                      {createWorkspaceMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      Save Details
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Workspace Created Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Your new workspace has been created and is ready to use.
                  </p>
                </div>

                {/* Workspace Preview Card */}
                <Card className="border border-gray-200 p-4 max-w-md mx-auto">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Layers className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {form.getValues("name") || "New Workspace"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {form.getValues("caseType")} • {form.getValues("client")}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Button
                  onClick={handleComplete}
                  className="bg-teal-600 hover:bg-teal-700 text-white w-full"
                >
                  Continue to Dashboard
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
