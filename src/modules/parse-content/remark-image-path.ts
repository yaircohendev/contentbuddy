import { visit } from 'unist-util-visit'

export function remarkImagePath(path: string) {
    return () => {
        return function transform(tree: any) {
            visit(tree, 'image', visitor)

            function visitor(node: { url: string }) {
                const relativeUrl = node.url
                const imageName = relativeUrl.replace(/.+\/(.+)/, '$1')
                node.url = `${path}/${imageName}`
            }
        }
    }
}
