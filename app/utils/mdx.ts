import path from 'path'

const getMdx = ({ contentDir, slug }: { contentDir: string; slug: string }) => {
  return getMdxFile().then(val => val)
}

const getMdxFile = async (): Promise<any> => {
  let a = path.basename(__dirname, '/routes')
  console.log('asdasd', a)
  return a
}

export { getMdx, getMdxFile }
