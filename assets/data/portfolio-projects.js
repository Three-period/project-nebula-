import { personalProjects } from './personal-projects.js';
import { workProjects } from './work-projects.js';

export const projectById = new Map(
  [...personalProjects, ...workProjects].map(project => [project.id, project])
);

export const featuredProjects = [projectById.get('personal-nebula')];

export const enterpriseProjects = [
  'work-rd-platform',
  'work-code-review',
  'work-skillhub'
].map(id => projectById.get(id));

export const yijingProjects = [
  'work-huizhou-ip',
  'work-luoburen'
].map(id => projectById.get(id));
