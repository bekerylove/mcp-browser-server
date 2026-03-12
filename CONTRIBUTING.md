# Contributing to MCP Browser Server

Thank you for your interest in contributing to MCP Browser Server! We appreciate your help in making this project better.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node.js version, browser version)
- **Additional context** (logs, error messages)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear title and description** of the enhancement
- **Use cases** for the enhancement
- **Potential implementation** approach (if known)
- **Examples** of how this would be used

### Pull Requests

1. **Fork the repository** and create your branch from `master`
2. **Make your changes** with clear, descriptive commit messages
3. **Write tests** for new features (if applicable)
4. **Ensure all tests pass**
5. **Update documentation** as needed
6. **Submit your pull request**

### Code Style

- Use **TypeScript** for all new code
- Follow **existing code structure** and patterns
- Use **descriptive variable and function names**
- Add **JSDoc comments** for public functions
- **Run `npm run typecheck`** before committing

### Commit Messages

Follow these guidelines for commit messages:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example:**
```
feat(stealth): add progressive scrolling behavior

Implement human-like scroll behavior with configurable
steps and delays for stealth mode.

Closes #123
```

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/mcp-browser-server.git
cd mcp-browser-server

# Install dependencies
npm install

# Install Playwright browsers
npm run install-browsers

# Run in development mode
npm run dev

# Run type checking
npm run typecheck

# Build for production
npm run build
```

## Testing

Before submitting your PR, ensure:

- [ ] Code compiles without errors (`npm run build`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] New features include tests (if applicable)
- [ ] Documentation is updated
- [ ] Commit messages follow guidelines

## Questions?

Feel free to:
- Open an issue for discussion
- Ask in existing pull requests
- Check existing documentation

Thank you for contributing! 🎉
