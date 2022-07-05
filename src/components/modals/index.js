import RenameChannel from './RenameChannel.jsx';
import AddChannel from './AddChannel.jsx';
import DeleteChannel from './DeleteChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: DeleteChannel,
  renaming: RenameChannel,
};

export default (modalName) => modals[modalName];