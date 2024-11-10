import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";

interface TagsInputProps {
  onTagsChange: (tags: string[]) => void;
  initialTags?: string[];
}

const TagsInput: React.FC<TagsInputProps> = ({
  initialTags = [],
  onTagsChange,
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  useEffect(() => {
    onTagsChange(tags);
  }, [tags, onTagsChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && inputValue.trim() !== "") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div className="relative">
      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1"
          >
            #{tag}
            <X
              size={14}
              className="cursor-pointer hover:text-destructive"
              onClick={() => handleDeleteTag(tag)}
            />
          </Badge>
        ))}
      </div>
      <Input
        className="pl-2 pt-10"
        placeholder="Enter tags..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
};

export default TagsInput;
