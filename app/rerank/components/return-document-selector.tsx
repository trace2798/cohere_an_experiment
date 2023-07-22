// import * as React from "react";
// import { Switch } from "@/components/ui/switch";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import { Label } from "@/components/ui/label";
// import { UseFormSetValue } from "react-hook-form";
// import { HoverContentComponent } from "@/components/HoverContentCompoent";

// type PromptFormValues = {
//   query: string;
//   model: string;
//   documents: (object | string)[];
//   top_n: number;
//   return_documents: boolean;
// };

// interface SelectReturnDocumentProps {
//   setValue: UseFormSetValue<PromptFormValues>;
//   return_documents: boolean;
//   hoverContentProps: {
//     type: string;
//     defaultValue: string;
//     options: string[];
//     functionality: string;
//     note: string;
//   };
// }

// export function SelectReturnDocument({
//   return_documents,
//   setValue,
//   hoverContentProps,
// }: SelectReturnDocumentProps) {
 

//   const [selectedModel, setSelectedModel] = React.useState(false);

//   return (
//     <div className="flex justify-between p-3 m-3 border rounded-lg w-fill dark:border-slate-800">
//       <div className="flex items-center justify-center w-full">
//         <HoverCard openDelay={200}>
//           <HoverCardTrigger asChild>
//             <Label htmlFor="return_documents">return_documents</Label>
//           </HoverCardTrigger>
//           <HoverCardContent
//             align="start"
//             className="w-[260px] text-sm"
//             side="left"
//           >
//             <HoverContentComponent {...hoverContentProps} />
//           </HoverCardContent>
//         </HoverCard>
//       </div>
//       <div>
//         <Switch
//           id="return_documents"
//           checked={return_documents}
//           onChange={handleReturnDocumentsChange}
//         />
//       </div>
//     </div>
//   );
// }
