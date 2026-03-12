# Development Notes

## ⚠️ IMPORTANT: OneDrive Conflict

**DO NOT run this project from OneDrive folder!**

If you're seeing this error:
```
Error: EPERM: operation not permitted, open '.next\trace'
```

**Solution:** Move the project outside OneDrive:

```powershell
# Move project to C:\Projects
cd C:\
mkdir Projects
Move-Item "C:\Users\mrabo\OneDrive\Desktop\Receipilot" "C:\Projects\Receipilot"
cd C:\Projects\Receipilot

# Install and run
npm install
npm run dev
```

**Why?** OneDrive syncs files in real-time, which conflicts with Next.js file operations in the `.next` folder. This causes permission errors.

**Alternative:** Exclude `.next` folder from OneDrive sync (not recommended - easier to just move the project).

---

## About the "Problems" in VS Code

You're seeing ~62 errors in VS Code's Problems tab, but **the code is actually fine**. Here's the breakdown:

### Error Categories:

1. **12 CSS Warnings** (`@tailwind`, `@apply` unknown) - Harmless
   - These are PostCSS directives that VS Code doesn't recognize
   - They work perfectly at build time
   - Fixed: Added `.vscode/css_custom_data.json` to suppress them

2. **7 TypeScript Type Library Warnings** - Can be ignored
   - Missing types for `event-source-polyfill`, `phoenix`, etc.
   - Already handled by `"skipLibCheck": true` in tsconfig.json
   - Don't affect functionality

3. **~40 Module Resolution Errors** - VS Code cache issue
   - VS Code's TypeScript server hasn't detected `node_modules`
   - All packages ARE installed (verified: `lucide-react`, `clsx`, etc.)
   - Will disappear after VS Code reloads

### To Fix VS Code Errors:

Press `Ctrl+Shift+P` → Type "TypeScript: Restart TS Server" → Enter

Or just close and reopen VS Code.

### To Verify Everything Works:

```bash
npm run dev
```

Visit http://localhost:3000 - if it builds successfully, ignore VS Code errors.

## Files Removed

Deleted premature files that aren't needed for local development:
- `.github/workflows/ci.yml` - CI/CD pipeline (add later when ready to deploy)
- `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md` - Documentation (add when open sourcing)
- Deployment scripts: `deploy.sh`, `deploy.bat`, `setup.sh`, `setup.bat`
- Docker files: `Dockerfile`, `docker-compose.yml`, `.dockerignore`

Focus: Get the app working locally first, add deployment/CI later.
