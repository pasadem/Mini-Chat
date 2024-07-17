import AddModal from './AddModal';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';

const modals = {
  adding: AddModal,
  removing: RemoveModal,
  renaming: RenameModal,
};

export default (modalName) => modals[modalName];
