---
description: Create a branch, commit changes, push, and open a PR against main using GitHub CLI
argument-hint: [branch-name]
allowed-tools: Bash(git:*), Bash(gh:*)
---

# Create Pull Request

Create a new branch, commit all pending changes, push, and open a pull request against `main` using the GitHub CLI (`gh`).

## Arguments

- `$1` — branch name (optional). If omitted, derive a concise, kebab-case branch name from the staged/unstaged changes (e.g. `fix-auth-redirect`, `style-button-color`).

## Preconditions

- Current working tree is a git repository with `gh` authenticated (`gh auth status`).
- A remote named `origin` exists and points to GitHub.
- `main` is the default integration branch.

## Steps

1. **Inspect state** — run `git status` and `git diff` (staged + unstaged) in parallel to understand pending changes. Abort with a message if the tree is clean.
2. **Resolve branch name**
   - Use `$1` if provided.
   - Otherwise infer a short, descriptive kebab-case name from the diff (max 40 chars).
   - Reject names matching `main`, `master`, or already-existing local/remote branches.
3. **Create branch** — `git checkout -b <branch>` from the current `HEAD`.
4. **Stage changes** — add only the files shown in step 1 by name. Do NOT use `git add -A` or `git add .` (avoids accidentally staging secrets / large binaries). Include untracked files that are clearly part of the change set.
5. **Commit**
   - Subject: Conventional Commit style (`feat:`, `fix:`, `style:`, `chore:`, `docs:`, `refactor:`, `test:`). ≤ 72 chars.
   - Body: only when the *why* is non-obvious. Wrap at 72 chars.
   - Always append the trailer:
     ```
     Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
     ```
   - Pass the message via heredoc to preserve formatting.
   - Do NOT use `--no-verify`, `--amend`, or `--no-gpg-sign`.
6. **Push** — `git push -u origin <branch>`.
7. **Open PR** — `gh pr create --base main --head <branch>` with:
   - `--title`: matches the commit subject (≤ 70 chars).
   - `--body` (heredoc):
     ```markdown
     ## Summary
     - <1–3 bullets describing what changed and why>

     ## Test plan
     - [ ] <verification step 1>
     - [ ] <verification step 2>

     🤖 Generated with [Claude Code](https://claude.com/claude-code)
     ```
8. **Return** the PR URL printed by `gh pr create` as the final output.

## Safety

- Never force-push.
- Never push directly to `main` / `master`.
- Never commit files that look like secrets (`.env`, `*.pem`, `credentials.*`, `*.key`). Warn and skip them.
- If a pre-commit hook fails: fix the underlying issue, re-stage, and create a **new** commit (do not `--amend`).
- If `gh` is not authenticated, stop and instruct the user to run `gh auth login`.

## Output

Print only the PR URL on success. On failure, print the failing command and its stderr.
