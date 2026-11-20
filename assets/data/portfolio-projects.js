import { personalProjects } from './personal-projects.js';
import { workProjects } from './work-projects.js';

export const projectById = new Map(
  [...personalProjects, ...workProjects].map(project => [project.id, project])
);

export const featuredProjects = [
  'personal-nebula',
  'work-rd-platform',
  'work-code-review',
  'work-skillhub'
].map(id => projectById.get(id));
