import React, { useState, useEffect, use } from 'react';
import { TextField, Chip } from '@mui/material';
import { set } from 'zod';

interface TagsInputProps {
  onTagsChange: (tags: string[]) => void;
  initialTags?: string[];
}

const TagsInput: React.FC<TagsInputProps> = ({ 
  initialTags = [],
  onTagsChange
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>('');

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
    if (e.key === ' ' && inputValue.trim() !== '') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <TextField
      className="w-full border border-gray-300 rounded-lg"
      fullWidth
      variant="outlined"
      placeholder="Enter tags..."
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      InputProps={{
        startAdornment: (
          <div className="flex gap-1 mr-2">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                onDelete={() => handleDeleteTag(tag)}
                size="small"
              />
            ))}
          </div>
        ),
      }}
    />
  );
};

export default TagsInput;