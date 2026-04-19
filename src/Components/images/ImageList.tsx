import { Box } from "@mui/material";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { reorderImages } from "../../store/images/imagesSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import ImageCard from "./ImageCard";

// imagelist gestion drag n drop
// dispatch reorderImages
// After dragging and dropping, calculate the new order.
export default function ImageList() {
  // -State*************************************************************************************************************
  const imagesState = useSelector((state: RootState) => state.images);
  const dispatch = useDispatch();

  const images = imagesState.ids
    .map((id) => imagesState.entities[id])
    .filter((image) => image !== undefined)
    .sort((a, b) => a.order - b.order);

  //drag drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = images.findIndex((image) => image.id === active.id);
    const newIndex = images.findIndex((image) => image.id === over.id);
    const newImages = arrayMove(images, oldIndex, newIndex);
    const newIds = newImages.map((image) => image.id);
    dispatch(reorderImages(newIds));
  };

  // -Render
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={images.map((image) => image.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
}