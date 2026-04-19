export const exportFileAsMarkdown = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith('.md') ? filename : `${filename}.md`;
  
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// executé par Morgan LUCAS fait par IA
export const importMarkdownFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        resolve(event.target.result);
      } else {
        reject(new Error("Le contenu du fichier n'est pas lisible."));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Erreur lors de la lecture du fichier."));
    };
    
    reader.readAsText(file);
  });
};
