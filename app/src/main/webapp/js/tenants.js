import { Avatar } from './dicebear.js';
import identicon from './identicon.json' with { type: 'json' };

const tenants = Array.from(document.querySelectorAll('.tenant-card'));
tenants.forEach(tenantEl => {
    const tenantId = tenantEl.dataset.tenantId;
    const avatar = new Avatar(identicon, {
        seed: tenantId,
        size: 50
    });

    const svg = avatar.toString();
    tenantEl.querySelector('.tenant-image-container').innerHTML = svg;
});

