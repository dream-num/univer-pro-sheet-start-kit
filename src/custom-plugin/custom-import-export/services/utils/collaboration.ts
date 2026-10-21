import type { IAccessor, UnitModel, UniverInstanceType } from '@univerjs/presets';
import { ISnapshotServerService, SnapshotService } from '@univerjs/preset-sheets-collaboration';
import { IUniverInstanceService } from '@univerjs/presets';

export function isCurrentUnitLoadedFromServer(accessor: IAccessor, type: UniverInstanceType): boolean {
    const unit = accessor.get(IUniverInstanceService).getCurrentUnitOfType<UnitModel>(type);
    if (!unit || !accessor.has(SnapshotService) || !accessor.has(ISnapshotServerService)) {
        return false;
    }

    return accessor.get(SnapshotService).isUnitLoadedFromServer(unit);
}
