/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { ChevronDown, ChevronUp, Dices, Info, Trash, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Label } from "~/components/ui/label";
import { useAppDispatch, useAppSelector } from '~/hooks/redux-hooks';
import { type FilterItem, filterItemAdded, filterItemRemoved } from '~/features/filter/filterItemsSlice'
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
}

export default function Category() {
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch()
  const filterItems = useAppSelector(state => state.filterItems);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to empty array if API fails
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const defaultVisibleCategories = categories.slice(0, 4);
  const collapsibleCategories = categories.slice(4);

  function renderCategories(categories: Category[]) {
    return categories.map(category => {
      const checked = filterItems.find(item => item.id === category._id) !== undefined ? true : false;

      function handleClick() {
        const newFilterItem: FilterItem = {
          id: category._id,
          description: category.name
        }
        dispatch(!checked ? filterItemAdded(newFilterItem) : filterItemRemoved(category._id));
      }
      
      return (
        <li 
          key={category._id}
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleClick}
        >
          <Checkbox checked={checked} className="cursor-pointer" id="category"/>
          <p className="text-xs font-light">{category.name}</p>
        </li>
      )
    });
  }

  if (loading) {
    return (
      <div className="flex flex-col p-6 pr-7 gap-6">
        <Label className="font-normal">Category</Label>
        <p className="text-xs text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  // Count selected categories
  const selectedCategoryCount = filterItems.filter(item => item.id !== 'priceRange').length;

  return (
    <div className="flex flex-col p-6 pr-7 gap-6">
      <div className="flex items-center justify-between">
        <Label className="font-normal">Category</Label>
        {selectedCategoryCount > 0 && (
          <span className="text-xs text-muted-foreground">
            {selectedCategoryCount} selected
          </span>
        )}
      </div>
      {selectedCategoryCount > 1 && (
        <p className="text-xs text-muted-foreground">
          Products from any selected category will be shown
        </p>
      )}
      <Collapsible
        open={categoryExpanded}
        onOpenChange={setCategoryExpanded}
      >
        <ul className="flex flex-col gap-3">
          {renderCategories(defaultVisibleCategories)}               
        </ul>
        {collapsibleCategories.length > 0 && (
          <CollapsibleContent className="mt-3">
            <ul className="flex flex-col gap-3">
              {renderCategories(collapsibleCategories)}           
            </ul>              
          </CollapsibleContent>
        )}
        {collapsibleCategories.length > 0 && (
          <CollapsibleTrigger className="-ml-3 mt-3" asChild>
            <Button className="text-muted-foreground text-xs cursor-pointer" variant="link">
              {categoryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {categoryExpanded ? "Show less" : "See more"}
            </Button>
          </CollapsibleTrigger>
        )}            
      </Collapsible>
    </div>
  );
}