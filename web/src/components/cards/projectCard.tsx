import { Project } from '../../types'

export const ProjectCard = ({ description, link, title }: Project) => (
    <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="card-actions justify-end pt-3">
                <a
                    className="btn btn-accent"
                    href={link}
                    rel="noreferrer"
                    target="_blank"
                >
                    View Code
                </a>
            </div>
        </div>
    </div>
);
