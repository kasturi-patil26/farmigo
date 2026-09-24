import { ProduceItem } from '../types';

export interface PooledLot {
  isPooled: true;
  fpoId: string;
  cropType: string;
  grade: string;
  totalQuantityTons: number;
  farmerCount: number;
  farmerNames: string[];
  location: string;
  harvestDate: string;
  pricePerQuintal: number; // average across pooled items
  imageUrl: string;
  memberItemIds: string[];
}

export type DisplayLot =
  | ({ isPooled: false } & ProduceItem)
  | PooledLot;

/**
 * Groups produce items that share the same FPO + crop + a harvest date
 * within a 7-day window into a single combined "pooled lot" for buyer
 * display. Items without an fpoId are returned individually, unchanged.
 */
export function groupProduceForBuyerView(items: ProduceItem[]): DisplayLot[] {
  const withFpo = items.filter((i) => !!i.fpoId);
  const withoutFpo = items.filter((i) => !i.fpoId);

  const groups = new Map<string, ProduceItem[]>();
  for (const item of withFpo) {
    // Group by FPO + crop + grade only — harvestDate in this app is a
    // display string ("2 days ago"), not a parseable date, so we don't
    // attempt a date-window bucket on top of it.
    const key = `${item.fpoId}__${item.cropType}__${item.grade}`;
    const existing = groups.get(key) ?? [];
    existing.push(item);
    groups.set(key, existing);
  }

  const pooledLots: DisplayLot[] = [];
  groups.forEach((groupItems, key) => {
    if (groupItems.length < 2) {
      // Only one farmer in this bucket — not a genuine pool, show individually
      groupItems.forEach((i) => pooledLots.push({ isPooled: false, ...i }));
      return;
    }
    const totalQuantityTons = groupItems.reduce((sum, i) => sum + i.quantityTons, 0);
    const avgPrice =
      groupItems.reduce((sum, i) => sum + i.pricePerQuintal, 0) / groupItems.length;

    pooledLots.push({
      isPooled: true,
      fpoId: groupItems[0].fpoId!,
      cropType: groupItems[0].cropType,
      grade: groupItems[0].grade,
      totalQuantityTons,
      farmerCount: groupItems.length,
      farmerNames: groupItems.map((i) => i.farmerName),
      location: groupItems[0].location,
      harvestDate: groupItems[0].harvestDate,
      pricePerQuintal: Math.round(avgPrice),
      imageUrl: groupItems[0].imageUrl,
      memberItemIds: groupItems.map((i) => i.id),
    });
  });

  const individual: DisplayLot[] = withoutFpo.map((i) => ({ isPooled: false, ...i }));
  return [...pooledLots, ...individual];
}
