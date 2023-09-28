import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface AttachmentProps {
  title: string;
  link: string;
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  get link() {
    return this.props.link;
  }

  set link(value: string) {
    this.props.link = value;
  }

  static create(props: AttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(props, id);
    return attachment;
  }
}
