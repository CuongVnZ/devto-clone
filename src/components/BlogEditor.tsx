import React, { useEffect, useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from "~/components/ui/button";
import TagsInput from '~/components/new/TagsInput';

interface BlogEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  initialCover?: string;
  onSubmit: (data: { title: string; content: string; tags: string[]; coverFile?: File }) => void;
  pending?: boolean;
  submitButtonText: string;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  initialCover = "https://placehold.co/600x300",
  onSubmit,
  pending = false,
  submitButtonText
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [cover, setCover] = useState(initialCover);
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setTags(initialTags);
    setCover(initialCover);
    console.log(initialCover);
  }, [initialTitle, initialContent, initialTags, initialCover]);  

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setSelectedFile(files[0]);
    setCover(URL.createObjectURL(files[0] as Blob));
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onSubmit({ title, content, tags, coverFile: selectedFile });
  }

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="mt-2 flex gap-3 items-center">
        <img className="w-[40%] rounded-lg" src={cover ?? "https://placehold.co/600x300"} alt="Cover" />
        <div>
          <Label>Add your cover image</Label>
          <Input
            type="file" 
            onChange={handleFileInput}
          />
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <input 
          className="w-full p-2 border border-gray-300 rounded-lg" 
          type="text" 
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TagsInput onTagsChange={setTags} initialTags={initialTags} />
        <div>
          <MdEditor modelValue={content} onChange={setContent} language='en-US'/>
        </div>
      </div>
      
      <Button className="w-full mt-4" onClick={handleSubmit} disabled={pending}>
        {submitButtonText}
      </Button>
    </div>
  );
}

export default BlogEditor;