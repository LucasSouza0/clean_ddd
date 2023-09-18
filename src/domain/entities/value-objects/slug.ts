export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Recebe uma string e aplica uma formatação para criar um slug.
   * 
   * Exemplo: "título de exemplo" => "titulo-de-exemplo"
   * 
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize("NFKD")
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText);
  }
}

