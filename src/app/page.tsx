import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Creative Technology for Thinking Machines</h1>
        <p className={styles.subtitle}>
          Parallel Drive is a software engineering lab redefining how products are built in the AI age.
        </p>
      </section>

      <section className={styles.services}>
        <h2>Our Services</h2>
        <div className={styles.serviceGrid}>
          <div className={styles.serviceCard}>
            <h3>Software Engineering as a Service</h3>
            <p>One monthly fee for development capacity with battle-tested processes and AI-Driven Development.</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>R&D Services</h3>
            <p>Cutting-edge research and development for AI-native workflows and agentic systems.</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>AI-Driven Development Consulting</h3>
            <p>Transform your development process with our proven AI-native methodologies.</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Open Source Development</h3>
            <p>Custom development and consulting for open-source projects and frameworks.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
