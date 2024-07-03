import { Tag } from "~/components/ui/Tag";
import { impactCategories } from "~/config";

export const ImpactCategories = ({ tag }: { tag?: string }) => (
  <div className="no-scrollbar">
    <div className="flex gap-1 overflow-x-auto">
      {tag && (
        <Tag key={tag} size="sm">
          {impactCategories[tag as keyof typeof impactCategories]?.label ?? tag}
        </Tag>
       )}
    </div>
  </div>
);
