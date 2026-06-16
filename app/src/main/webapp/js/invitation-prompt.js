import { Avatar } from './dicebear.js';
import identicon from './identicon.json' with { type: 'json' };

const tenantId = document.querySelector('.tenant-header').dataset.tenantId;
document.querySelector('.tenant-image-container').innerHTML = new Avatar(identicon, { seed: tenantId, size: 60 }).toString();
