import { testUser } from '../../utils/index.js';
export default function isAdmin(req, res, next) {
    if (testUser.isAdmin()) {
        next();
    }
    else {
        res.json({
            message: 'Error: User is not authorized'
        });
    }
}
//# sourceMappingURL=isAdmin.js.map